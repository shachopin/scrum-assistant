1.in auth.controller.js
 function register(user) {
      /*return*/ // no need to rturn as in the original code
      firebaseAuthObject.$createUserWithEmailAndPassword(user.email, user.password)
       .then(function(newUser) {
       newUser.updateProfile({
          displayName: user.name,
          photoURL: user.isscrummaster ? "scrum master" : "" //because firebaseAuthObject doesn't support custom attribute, I am hijacking photoURL to mean title
       }); //photoURL and displayName are supported natively by firebaseauthObject already

        //console.log(user); //user email has to be unique
        return vm.login(user);  //it's funny, sending email to shachopin+newaccount@gmail.com works and sends it to shachopin@gmail.com, actually shachopin+anything@gmail.com works
      }) //will now automatically log in
       .then(function() {
        //return authService.sendWelcomeEmail(user.email);
      })
       .catch(function(error) {
        console.log(error); //if you register an existing user, you will get error
        vm.error = error;
      });
    }
    
    
2.regsiter.html, checkbox implementation

 <label class="text-primary">I'm a scrum master &nbsp;
    <input type="checkbox" ng-model="vm.user.isscrummaster" autofocus style="position: relative; top: 2px;">
  </label><br/>

3
<div ng-show="vm.isScrumMaster" class="styled-select slate">
  <!--Before it was select  ng-model="vm.member" ng-options="member for member in ['Dawei', 'Raymond', 'Ben']" ng-change="vm.handleOptionClick()" title="Members", and it works fine--> 
  
  <!--select  ng-model="vm.member" ng-options="member.$id for member in vm.members" ng-change="vm.handleOptionClick()" title="Members"-->
  <!--the above way is good, but vm.member is still an object, (the sympton is the form will say create a todo for [Object]) but we want the value to be string -->
  <select  ng-model="vm.member" ng-change="vm.handleOptionClick()" title="Members">
    <option value="">Select a member</option> <!--always there in the two approaches -->
    <option ng-repeat="member in vm.members" ng-value="member.$id">  <!--$id tis the key name-->
    {{member.$id}}</option>
  </select>
</div>


4. firebase database operations

https://stackoverflow.com/questions/36572227/firebase-add-push-set
$add with $firebaseArray
.push() method
.set() method


Answer:
If I have the following data tree in Firebase:

{
  users:
   {
      key: { name:"bob" }
   }
}
When I do an $add, I will create a new item in the tree

$scope.data.child('users').$add({
    name: name
  });
Since $add uses the Push method in Firebase, new random Key will be used when pushing data to the child.

{
  users:
   {[
      key: { name:"bob" },
      key2: { name:"name" }
   ]}
}
If I do a set on the same Users object, I will overwrite the data that is already there. So, in your example, without specifying a key, you will overwrite the entire user object.

$scope.userRef.child('users').set({
       name: name
           });
      };
This will result with this data

{
  users:
   {
      name: "name"
   }
}
This happens because any null values you pass to the Set method will delete any data that was originally there.

Passing null to set() will remove the data at the specified location. https://www.firebase.com/docs/web/api/firebase/set.html


===========================================================

 function ItemsController($firebaseArray, user) { 
    var vm = this; 
    
    vm.members = $firebaseArray(firebase.database().ref().child("staticUserList"));
    
    var ref = firebase.database().ref().child("staticUserList");
    ref.once("value")
      .then(function(snapshot) {
        var exist = snapshot.child(user.displayName).exists(); //.exists() only for snapshot. snapshot.child returns a snapshot: https://firebase.google.com/docs/reference/js/firebase.database.DataSnapshot
        if (!exist) {
          //$firebaseArray(firebase.database().ref().child("staticUserList").child(user.displayName)).$add(1);
          firebase.database().ref().child("staticUserList").child(user.displayName).push(1);  //also works, both create random key
        }
    });
     
    grabDataByUserDisplayName(user.displayName);
    vm.handleOptionClick = handleOptionClick;
    vm.isScrumMaster = user.photoURL === "scrum master";
 
    //utility function ///////////////////////////////////////////////
    function handleOptionClick() {
      grabDataByUserDisplayName(vm.member ? vm.member : user.displayName); //if don't select anyone, then by default create task for yourslef
    }
    
    function grabDataByUserDisplayName(displayName) {
      vm.todos = $firebaseArray(firebase.database().ref().child("users").child(displayName).child('todo').child("items"));
      vm.doings = $firebaseArray(firebase.database().ref().child("users").child(displayName).child('doing').child("items"));
      vm.dones = $firebaseArray(firebase.database().ref().child("users").child(displayName).child('done').child("items"));
    }
  }
 })();


============================================================

  //var fireQuestions = firebase.database().ref('questions');
      //console.log(fireQuestions.length);  //show undefined fireQuestions is not a normal array
      //Array.prototype.push.apply(fireQuestions, questions); //array merge for normal js, 2nd array is merged into 1st array, but fireQuestions is not a normal js array
      
      // var questions = []
      // fireQuestions.once('value',function(snap) {
      //     snap.forEach(function(item) {
      //       questions.push(item.val());
      //     });     
      // });
  
      // fireQuestions.push({
      //   label: "Java",
      //   desc: "good language"
      // });
      
      // http://stackoverflow.com/questions/25538400/firebase-how-to-extract-values-from-snapshot-object
      // http://stackoverflow.com/questions/41427859/get-array-of-items-from-firebase-snapshot
      // https://howtofirebase.com/save-and-query-firebase-data-ed73fb8c6e3a
  
      //in firebase console, for name field, 
      //when type number, considered as array index (has to start from 0, otherwise the place filler is null value), 
      //when type string, considered as object property
 /*********************************************************************************/ 
      function QuestionBank() {
        var colorHandler = new oj.ColorAttributeGroupHandler();  //needs both 'ojs/ojcore', 'ojs/ojsunburst' library for this to work
        var questions = [];
        var parentNode = {};
        this.questionUrlMapper = {};
        self = this;
        this.retrieveNodesFromFirebase = retrieveNodesFromFirebase;
            
        //instance methods
        function retrieveNodesFromFirebase() {
         return new Promise((resolve, reject) => {
           var fireQuestions = firebase.database().ref('questions');
           fireQuestions.once('value',function(snap) {
              snap.forEach(function(item) {
                questions.push(item.val());
              }); 
              goThroughQuestions(questions, parentNode);
              resolve(parentNode.nodes);
           });
         });
        }
        
        
5.


   function isLoggedIn() {
      if (firebaseAuthObject.$getAuth()) {
        vm.username = firebaseAuthObject.$getAuth().displayName;
        return true;
  }
  //return firebaseAuthObject.$getAuth(); //if loggedin will return user object, if not return null
  }

  function notOnAppPage() {
      return $location.path() !== "/employee";
  }
