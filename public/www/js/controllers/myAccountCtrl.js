function myAccountCtrl($scope) {
  $scope.peopleIOwe = [
    {id:1, name:'Jaydeep Dhar', amount:120},
    {id:2, name:'Alomgir Miah', amount:200}
    ];

  $scope.peopleWhoOwe = [
    {id:3, name:'Anup Soni', amount:281},
    {id:4, name:'Abishek Jhureley', amount:98}
    ];

    $scope.peopleHisory = [
    {id:1, peopleId:1, tranDate:'10/20/2003', amount:-24, comments:'dinner'},
    {id:2, peopleId:1, tranDate:'10/20/2013', amount:54, comments:'dinner'},
    {id:3, peopleId:2, tranDate:'10/20/2004', amount:-21, comments:'dinner'},
    {id:4, peopleId:2, tranDate:'1/20/2005', amount:-67, comments:'dinner'},
    {id:5, peopleId:3, tranDate:'10/20/2003', amount:84, comments:'dinner'},
    {id:6, peopleId:3, tranDate:'1/21/2002', amount:94, comments:'dinner'},
    {id:7, peopleId:4, tranDate:'10/2/2007', amount:324, comments:'dinner'},
    {id:8, peopleId:4, tranDate:'10/10/2002', amount:-245, comments:'dinner'},
    {id:9, peopleId:2, tranDate:'10/13/2006', amount:-144, comments:'dinner'},
    ]
};
