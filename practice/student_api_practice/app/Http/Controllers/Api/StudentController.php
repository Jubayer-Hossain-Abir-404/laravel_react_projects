<?php

namespace App\Http\Controllers\Api;

use App\Models\Student;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;


class StudentController extends Controller
{
    private $base_url;
    public function __construct(){
        $this->base_url = url('/');
    }
    public function index()
    {
        $students = Student::all();

        if (count($students) > 0) {
            return response()->json([
                'status' => 200,
                'students' => $students,
                "message" => "Students data found"
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                "message" => "Students data not found"
            ], 404);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:191',
            'email' => 'required|email|max:191',
            'phone' => 'required|digits:11|numeric',
            'course' => 'required|max:191',
            // 'file' => 'nullable|image|mimes:jpeg,jpg,png,gif|max:5000',
            'file' => 'nullable|max:5000',
            'degree_type' => 'nullable|numeric',
            'gender' => 'nullable|max:1',
            'countries' => 'nullable|array',
            "countries.*" => "nullable|string|distinct|min:2",
            'range' => 'nullable|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'message' => $validator->messages()
            ], 422);
        }

        $file = $request->file('file');
        $save_file = null;
        if (!empty($file)) {
            $file_name = rand(123456, 999999) . '.' . $file->getClientOriginalExtension();
            $file_path = public_path('student_files');
            $file->move($file_path, $file_name);
            $save_file = $this->base_url . '/' . 'student_files/' . $file_name;
        }

        $student = new Student();
        $student->name = $request->name;
        $student->email = $request->email;
        $student->phone = $request->phone;
        $student->course = $request->course;
        $student->file = $save_file;

        $student->isMarried = $request->isMarried ?? 0;
        $student->degree_type = $request->degree_type ?? null;
        $student->gender = $request->gender ?? null;

        $student->countries = !empty($request->countries) ? implode(",", $request->countries) : null;
        $student->range = $request->range ?? 0;
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

    public function edit($id)
    {
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
                'course' => 'required|max:191',
                'file' => 'nullable|image|mimes:jpeg,jpg,png,gif|max:5000',
                'degree_type' => 'nullable|numeric',
                'gender' => 'nullable|max:1',
                'countries' => 'nullable|array',
                "countries.*" => "nullable|string|distinct|min:2",
                'range' => 'nullable|numeric',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 422,
                    'message' => $validator->messages()
                ], 422);
            }

            if ($request->hasFile('file')) {
                if(!empty($student->file)){
                    $url_info = parse_url($student->file);
                    if(isset($url_info['path']) && !empty($url_info['path'])){
                        if (file_exists( public_path() . $url_info['path'])){
                            unlink(public_path($url_info['path']));
                        }
                    }
                }
                $file = $request->file('file');
                $file_name = rand(123456, 999999) . '.' . $file->getClientOriginalExtension();
                $file_path = public_path('student_files');
                $file->move($file_path, $file_name);
                $student->file = $this->base_url . '/' . 'student_files/' . $file_name;
            }

            $student->name = $request->name;
            $student->email = $request->email;
            $student->phone = $request->phone;
            $student->course = $request->course;

            if(!empty($request->isMarried)){
                $student->isMarried = $request->isMarried;
            }
            if(!empty($request->degree_type)){
                $student->degree_type = $request->degree_type;
            }

            if(!empty($request->gender)){
                $student->gender = $request->gender;
            }

            if(!empty($request->countries)){
                $student->countries = implode(",", $request->countries);
            }
            if(!empty($request->range)){
                $student->range = $request->range;
            }
            if ($student->update()) {
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

    public function delete($id)
    {
        $student = Student::find($id);
        if ($student) {
            $result = $student->delete();
            if ($result) {
                return response()->json([
                    'status' => 200,
                    'message' => "Student Deleted Successfully"
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
}
