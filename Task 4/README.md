<h3>Market Place API Documentation</h3>

<pre>
Store Seller Lots
Endpoint: http://0.0.0.0:8000/api/v1/create-lots/
Method: Post

Request:
{
"companyName":"Delicious Apples LTD",
"lotName":"Red Dacca",
"productName":"Apples",
"lotWeight":"",
"lotMinimumWeight":1000,
"country":"",
"harvestDate":"2018-07-27",
"lotStatus":"bidding"
}

Request Validation:

If fields is empty following errors will be produce

Response:
{
    "status": 400,
    "message": "The given data was invalid"
    "errors": {
    "lotWeight": [
        "message": "Lots Weight field is required."
    ],
    "country": [
        "message": "Country field is required."
    ]
    }
}

No issues response below

Response:
{
"data" :
{
"lotId":1,
"companyName":"Delicious Apples LTD",
"lotName":"Red Dacca",
"productName":"Apples",
"lotWeight":500,
"lotMinimumWeight":1000,
"country":"Costa Rica",
"harvestDate":"2018-07-27",
"lotStatus":"bidding"
}
"status": 200,
"message": "Your lot is saved successfully"
}

</pre>
<pre>

Update Seller Lots
Endpoint: http://0.0.0.0:8000/api/v1/update-lots/1
Method: Put
Request:
{
"harvestDate":"2018-06-14",
}

Response:
{
"data" :
{
"lotId":1,
"companyName":"Delicious Apples LTD",
"lotName":"Red Dacca",
"productName":"Apples",
"lotWeight":500,
"lotMinimumWeight":1000,
"country":"Costa Rica",
"harvestDate":"2018-06-14",
"lotStatus":"bidding"
}
"status": 200,
"message": "Your lot is updated successfully"
}

</pre>
