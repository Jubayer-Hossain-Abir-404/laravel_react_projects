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

        $file = $request->file('file');
        $save_file = null;
        if(!empty($file)){
            $file_name = rand(123456, 999999) . '.' . $file->getClientOriginalExtension();
            $file_path = public_path('student_files');
            $file->move($file_path, $file_name);
            $base_url = url('/');
            $save_file = $base_url. '/'. 'student_files/' . $file_name;
        }

        $student = new Student();
        $student->name = $request->name;
        $student->email = $request->email;
        $student->phone = $request->phone;
        $student->course = $request->course;
        $student->file = $save_file;

        $response = $student->save();

        if ($response) {
            return response()->json([
                'status' => 200,
                'student' => $response,
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
