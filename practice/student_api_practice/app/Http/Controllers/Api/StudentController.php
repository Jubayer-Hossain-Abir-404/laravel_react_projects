<?php

namespace App\Http\Controllers\Api;

use App\Models\Student;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;


class StudentController extends Controller
{
    public function index(){
        $students = Student::all();

        if(count($students) > 0){
            return response()->json([
                'status' => 200,
                'students' => $students,
                "message" => "Students data found"
            ],200);
        }else{
            return response()->json([
                'status' => 404,
                "message" => "Students data not found"
            ], 404);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required|max:191',
            'email' => 'required|email|max:191',
            'phone' => 'required|digits:11|numeric',
            'course' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'message' => $validator->messages()
            ], 422);
        }

        $student = Student::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'course' => $request->course
        ]);

        if ($student) {
            return response()->json([
                'status' => 200,
                'student' => $student,
                'message' => "Student Created Successfully"
            ], 200);
        } else {
            return response()->json([
                'status' => 500,
                'message' => "Something went wrong!"
            ], 500);
        }
    }

    public function edit($id){
        $student = Student::find($id);

        if ($student) {
            return response()->json([
                'status' => 200,
                'student' => $student,
                'message' => "Student Data Found Successfully"
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => "Student Data not found!"
            ], 404);
        }
    }

    public function update(Request $request, $id)
    {
        $student = Student::find($id);
        if ($student) {
            $validator = Validator::make($request->all(), [
                'name' => 'required|max:191',
                'email' => 'required|email|max:191',
                'phone' => 'required|digits:11|numeric',
                'course' => 'required|max:191'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 422,
                    'message' => $validator->messages()
                ], 422);
            }

            $student->update([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'course' => $request->course
            ]);

            if ($student) {
                return response()->json([
                    'status' => 200,
                    'student' => $student,
                    'message' => "Student Updated Successfully"
                ], 200);
            } else {
                return response()->json([
                    'status' => 500,
                    'message' => "Something went wrong!!"
                ], 500);
            }
        } else {
            return response()->json([
                'status' => 404,
                'message' => "Student Data not found!"
            ], 404);
        }
    }

    public function delete($id){
        $student = Student::find($id);
        if ($student) {
            $result = $student->delete();
            if($result){
                return response()->json([
                    'status' => 200,
                    'message' => "Student Deleted Successfully"
                ], 200);
            }else{
                return response()->json([
                    'status' => 500,
                    'message' => "Something went wrong!!"
                ], 500);
            }
        }else{
            return response()->json([
                'status' => 404,
                'message' => "Student Data not found!"
            ], 404);
        }
    }
}
