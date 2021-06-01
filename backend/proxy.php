<?php

class API
{
    function search()
    {
        header("Access-Control-Allow-Origin: http://localhost:3000");
        header('Content-Type: application/json');
        header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Access-Control-Allow-Methods, Content-Type");

        // Get the search and filter values from the url
        $search_params = isset($_GET['name']) ? $_GET['name'] : die();
        $filter = isset($_GET['filter']) ? $_GET['filter'] : die();
        $search_params_encoded = rawurlencode($search_params);

        $url = "https://apis.is/company?name=" . $search_params_encoded;

        // Set URL
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HTTPGET, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, {
        "Content-Type: application/json"});
        // return the transfer as a string of the return value of  instead of outputting it directly
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        if (FALSE === ($resp = curl_exec($ch))) {
            die(error_log(curl_error($ch)));
        }

        $decoded = json_decode($resp, true);

        if ($decoded["results"] == [] && $search_params) {
            http_response_code(404);
        } else {
            $companies_arr = $decoded["results"];
            if ($filter == "REGISTERED") {
                $found = array_filter($companies_arr, function ($companies_arr) {
                    return $companies_arr['active'] !== 0;
                });
                $foundArr = array_merge($found);
                print_r(json_encode($foundArr));
            } else if ($filter == "DEREGISTERED") {
                $found = array_filter($companies_arr, function ($companies_arr) {
                    return $companies_arr['active'] !== 1;
                });
                $foundArr = array_merge($found);
                print_r(json_encode($foundArr));
            } else {
                print_r(json_encode($companies_arr));
            }
        }
        curl_close($ch);
    }
}

$API = new API;
echo $API->search();
