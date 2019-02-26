var app=angular.module("myapp",[])

app.controller("postapp",['$scope','$http', function($scope,$http){
    $scope.Post=function(){
        if($scope.name==undefined || $scope.text==undefined)
        {
            alert("Please fill fields")
        }
        else{
        var d = new Date().toUTCString();
        var name=$scope.name
        data={"data": $scope.text,
               "time":d,
               "number":0,
               "Name":name
                      }
        $http.post("/data",data).then(function(res) {
            console.log(res)
            $scope.name=""
            $scope.text=""
            refresh();
            
          })
    }
}
    $scope.like=function(id,a){
        $http.post("/like",{id,a}).then(function(res) {
            console.log(res)
            refresh();
        
    })
}
    refresh=function(){
        $http.get('/data')
        .then(function(res) {
            console.log(res)
          $scope.response=res;
         
        })

    }

refresh();

}])
