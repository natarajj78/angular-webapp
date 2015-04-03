(function() {
    'use strict';
    angular
        .module('app.cbg')
        .controller('codebeacongridCtrl',codebeacongridCtrl);
	function codebeacongridCtrl($scope,$http) {
        /* jshint validthis: true */
        $scope.currentdate = new Date();
        $scope.time="Any time";
        $scope.mySelections = [];
        $scope.filterOptions = {
            name:"",
            signature:"",
            page:"",
            dateStart:"",
            dateEnd:"",
            filterText: "",
            useExternalFilter: true
        };

        $scope.dateCalc = function(noofDays){
            var date = new Date();
            var yesterday = date - 1000 * 60 * 60 * 24 * noofDays;
            return  new Date(yesterday);
        }
        $scope.totalServerItems = 0;
        $scope.pagingOptions = {
            pageSizes: [10,20,30,40,50,100],
            pageSize: 20,
            currentPage: 1
        };
        $scope.TableStyle = {top: -5};
        //$scope.mycellTemplate  ="<div class=''><<input type='checkbox'/></div>";
        //$scope.childTemplate = "<div ng-mouseover='showChildDetails($event, row);' ng-mouseleave='hideChildDetails($event, row)'>{{row.treatmentId}}</div>";

        $scope.setPagingData = function(data, page, pageSize){

        //if(data){
            var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
            $scope.myData = pagedData;
            $scope.totalServerItems = data.length;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        //}
        };
        $scope.getPagedDataAsync = function (pageSize, page, searchText, fOptions) {
            setTimeout(function () {
                var data;
                var params_val; // = {name:$scope.filterOptions.name,signature:$scope.filterOptions.signature,page:$scope.filterOptions.page};
                params_val = "searchParams={name:"+$scope.filterOptions.name+",signature:"+$scope.filterOptions.signature+",page:"+$scope.filterOptions.page+"}"; 

                $http({
                    "url":"/api/codebeacons",
                    "method":"GET",
                    "headers":{'Content-Type':'application/json'},
                    //"params":{searchParams:{shiftDate:"2014-06-26", age:"20" }}
                    "params":{searchParams: params_val}
                }).success(function (largeLoad) {
                    $scope.setPagingData(largeLoad,page,pageSize);
                });
            }, 100);
        };
        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

    $scope.$watch('time', function (newVal, oldVal) {
        jQuery(".time").text("");
        $scope.filterOptions.dateEnd=$scope.currentdate;
        if( angular.equals($scope.time, "Any time") )      { $scope.filterOptions.dateStart=''; $scope.filterOptions.dateEnd='';}
        if( angular.equals($scope.time, "Past hour") )     { $scope.filterOptions.dateStart=$scope.dateCalc(1);  }
        if( angular.equals($scope.time, "Past 24 hours") ) { $scope.filterOptions.dateStart=$scope.dateCalc(1); }
        if( angular.equals($scope.time, "Past week") )     { $scope.filterOptions.dateStart=$scope.dateCalc(7); }
        if( angular.equals($scope.time, "Past 2 week") )   { $scope.filterOptions.dateStart=$scope.dateCalc(14);    }
        if( angular.equals($scope.time, "Past 4 week") )   { $scope.filterOptions.dateStart=$scope.dateCalc(28);   }
        if( angular.equals($scope.time, "Past 180 days") ) { $scope.filterOptions.dateStart=$scope.dateCalc(180);   }
        if( angular.equals($scope.time, "Past year") )     {    $scope.filterOptions.dateStart=$scope.dateCalc(365);  }
        if( angular.equals($scope.time, "Past 2 years") )  { $scope.filterOptions.dateStart=$scope.dateCalc(770); }
        if( angular.equals($scope.time, "Custom range") )  { $scope.time=""; }

    }, true);

    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        //if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText, $scope.filterOptions);
        //}
    }, true);
    $scope.$watch('filterOptions', function (newVal, oldVal) {
        //if (newVal !== oldVal) {
        if($scope.filterOptions.name.length >= 3  ){  
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText, $scope.filterOptions);
        }
    }, true);
            
    $scope.grid={
        options:{
            data: 'myData',
            enablePaging: true,
            showFooter: true,
            totalServerItems:'totalServerItems',
            pagingOptions: $scope.pagingOptions,
            filterOptions: $scope.filterOptions,
            selectedItems: $scope.mySelections,
            multiSelect  : false,
            enableRowSelection: false,
            enableCellEditOnFocus: false,
             afterSelectionChange: function() {
                $scope.details = $scope.mySelections;
            },
            showSelectionCheckbox: true,
            selectWithCheckboxOnly: false   ,
            columnDefs:[
                {field:"message", displayName:"Message", enableCellEdit: true},
                {field:"notes",displayName:"Signature"},
                {field:"date", displayName:"Date/Time", cellFilter: 'date:\'MM/dd/yyyy h:mm:ss a\'' , enableCellEdit:false},
                {field:"page", displayName:"Page"},
                {field:"url",  displayName:"Url"},
                {field:"", displayName:"", enableCellEdit: false, cellTemplate: '<div>&nbsp;&nbsp;<button type="button" class="btn btn-default btn-xs"  data-toggle="modal" data-target="#dialoggrid" ng-click="listData(this);"><span class="glyphicon glyphicon-edit"></span></button></div>', width: 50},
                {field:"", displayName:"", enableCellEdit: false, cellTemplate: '<div>&nbsp;&nbsp;<button type="button" class="btn btn-default btn-xs"  ng-click="removeBeacon(this);"><span class="glyphicon glyphicon-trash"></span></button></div>', width: 50}

            ]
        }
        // ,
        // optionsExt:{
        //     data:'myData',
        //     multiSelect:false
        // }
    };
    $scope.clearTxt=function(){
        $scope.filterOptions.name   = "";
        $scope.filterOptions.signature    = "";
        $scope.filterOptions.page = "";
    } // end clearTxt().
    $scope.search=function(){
        console.log("Testing... ");
        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText,$scope.filterOptions);
    }
    $scope.listData=function(index){
        if(jQuery(index)){
            console.log( index.h);
        }
    } 
    $scope.removeBeacon=function(item){
        console.log("called delete");
        $http({
            "url":"/api/codebeacons/remove/"+item.row.entity._id,
            "method":"DELETE"
        }).success(function () {
            window.location.href="/#/codebeacongrid";
        });
    }
    $scope.addEditBeacon=function(){
        console.log("Hello This is the test page");
    }
    $scope.details = null;
    }   // end function 
})();