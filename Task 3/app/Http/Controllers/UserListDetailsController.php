<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\UsersListDetails;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\File;
use App\Exports\UsersListsDownload;


class UserListDetailsController extends Controller
{
  public function index(Request $request)
  {
    $user = UsersListDetails::get();

    return response()->json(["userlist" => $user]);
  }

  public function save()
  {
    $response = Http::get("https://randomuser.me/api?results=50");
    if ($response) {
      $response = $response->json();

      $gender = [];
      $city = [];
      $state = [];
      $country = [];
      $postcode = [];
      $email = [];
      $phone = [];
      $picture = [];
      foreach ($response['results'] as  $value) {

        $gender = $value['gender'];
        $name = $value['name'];
        $city = $value['location']['city'];
        $state = $value['location']['state'];
        $country = $value['location']['country'];
        $postcode = $value['location']['postcode'];
        $email = $value['email'];
        $phone = $value['phone'];
        $picture = $value['picture']['large'];

        $address = [
          "street" => $value["location"]['street'],
          "country" => $country,
          "state" => $state,
          "city" => $city,
          "postcode" => $postcode
        ];

        $requestData = new UsersListDetails();
        $requestData->gender = $gender;
        $requestData->name = json_encode($name);
        $requestData->address = json_encode($address);
        $requestData->email = $email;
        $requestData->phone = $phone;
        $requestData->photo = $picture;
        $result = $requestData->save();
      }
    }

    $user = UsersListDetails::latest()->paginate(5);
    if ($user) {
      return response()->json([
        'response' => 'success',
        'response_code' => Response::HTTP_OK,
        'message' => "data retrive successfully",
        'result' => [
          'UsersListDetails' => $user
        ]
      ]);
    } else {
      return response()->json([
        'response' => 'error',
        'response_code' => Response::HTTP_BAD_REQUEST,
        'message' => "error while fetching data",
        'result' => []
      ]);
    }
  }

  public function edit($id)
  {
    $user = UsersListDetails::find($id);
    if ($user) {
      return response()->json([
        'response' => 'success',
        'response_code' => Response::HTTP_OK,
        'message' => "data retrive successfully",
        'result' => [
          'UsersListDetails' => $user
        ]
      ]);
    } else {
      return response()->json([
        'response' => 'error',
        'response_code' => Response::HTTP_BAD_REQUEST,
        'message' => "error while fetching data",
        'result' => []
      ]);
    }
  }

  public function update(Request $request, $id)
  {
    $user = UsersListDetails::find($id);
    $user->gender = $request->input('gender');
    $user->name = $request->input('name');
    $user->address = $request->input('address');
    $user->email = $request->input('email');
    $user->phone = $request->input('phone');
    $user->photo = $request->input('photo');

    $result =
      $user->save();;
    if ($result) {
      return response()->json([
        'response' => 'success',
        'response_code' => Response::HTTP_OK,
        'message' => "user update successfully",
      ]);
    } else {
      return response()->json([
        'response' => 'error',
        'response_code' => Response::HTTP_BAD_REQUEST,
        'message' => "error while update user",
        'result' => []
      ]);
    }
  }
  public function download_excel()
  {
    return Excel::download(new UsersListsDownload, 'UsersLists' . '.xlsx');
  }
}
