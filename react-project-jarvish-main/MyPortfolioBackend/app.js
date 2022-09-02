
var express = require("express");
var mongoose = require("mongoose");
var app = express();
var database = require("./config/database");
var bodyParser = require("body-parser"); // pull information from HTML POST (express4)
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var port = process.env.PORT || 8000;
var User = require("./model/user");
var Contact = require('./model/Contact');
var ProjectWork = require('./model/ProjectWork');

var cors = require("cors");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: "true" })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: "application/vnd.api+json" })); // parse application/vnd.api+json as json

mongoose.connect(database.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("error", function (error) {
  console.log(error);
  console.log("NOT CONNECTED");
});
mongoose.connection.on("open", function () {
  console.log("Connected to MongoDB database.");
});

const userService = require("./service/userService");
const personalDetailsService = require("./service/personalDetails");
const recommendationService = require("./service/Recommendation");
const SkillService = require("./service/SkillService");
const res = require("express/lib/response");
const ExperienceService = require("./service/ExperienceService");
const certificationService = require('./service/Certification');
const educationalService = require("./service/EducationalBG");
const professionalService = require("./service/ProfessionalBG");
const interestService = require("./service/Interest");
const contactService = require('./service/contactService');
const projectWorkService = require('./service/projectWorkService');

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(500).send("All input is required");
    }
    const user = await userService.getUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ userId: user._id, email }, "secret", {
        expiresIn: "2h",
      });

      user.token = token;
      res.status(200).json(user);
    }else{
      res.status(500).send("Invalid Credentials");
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!(email && password && firstName && lastName)) {
      res.status(500).send("All input is required");
    }
    const oldUser = await userService.getUserByEmail(email);
    if (oldUser) {
      return res.status(500).send("User Already Exist. Please Login");
    }

    encryptedPassword = await bcrypt.hash(password, 10);
    const user = {
      firstName,
      lastName,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    };
    if (userService.addUser(user)) {
      res.status(200).json(user);
    } else {
      return res.status(500).send("Something went wrong!");
    }
  } catch (err) {
    console.log(err);
  }
});

//personal details

app.post("/api/addpersonaldetails", async (req, res) => {
  try {
    const { userId, displayName, jobTitle, about } = req.body;

    if (!(displayName && jobTitle && about)) {
      res.status(500).send("All input is required");
    }
    const user = await userService.getUserById(userId);
    if (user) {
      const data = {
        userId: userId,
        displayName: displayName,
        about: about,
        jobTitle: jobTitle,
      };
      if (personalDetailsService.addPersonalDetails(data)) {
        res.status(200).send("User's personal details added successfully.");
      } else {
        res.status(500).send("User does not exist.");
      }
    } else {
      res.status(500).send("User does not exist.");
    }
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/personaldetails/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await personalDetailsService.getUserPersonalDetailsById(
      userId
    );
    console.log("User" + user);
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(500).send("User does not exist.");
    }
  } catch (err) {
    res.status(500).send("User does not exist.");
    console.log(err);
  }
});

app.delete("/api/deleteAccount/:userId", async (req, res) => {
  var result = userService.deleteUser(req.params.userId);
  personalDetailsService.deleteUsersPersonalDetails(req.params.userId);
  console.log(result);
  if (result) {
    res.status(200).send("Deleted");
  } else {
    res.status(500).send("failed");
  }
});

app.put("/api/updateUser/:email", async (req, res) => {
  var email = req.params.email;
  var userObj = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  };
  var result = userService.updateUser(email, userObj);
  console.log(result);
  if (result) {
    res.send("Updated");
  } else {
    res.send("failed");
  }
});

app.delete("/api/deleteUser/:email", async (req, res) => {
  var result = userService.deleteUser(req.params.email);
  console.log(result);
  if (result) {
    res.send("Deleted");
  } else {
    res.send("failed");
  }
});

app.get("/api/users/:id", async (req, res) => {
  console.log(req.params.id);
  const result = await User.findOne({ _id: req.params.id });
  if (result) {
    console.log(result);
    res.send(result);
  }
});

app.get("/home", function (req, res) {
  res.send("Welcome To Portfolio Website");
});

//Skills
app.post("/api/add_skills",async(req,res)=>{
  try {
    
console.log(req.body);
const{userId,SkillName} =req.body;
console.log(userId + " "+SkillName+"testing!");
if(!SkillName){
  res.status(500).send("Skill is required");
}
  const user = await userService.getUserById(userId);
  if(user){
    const data= {
      userId:userId,
      SkillName:SkillName,
    };
    if(SkillService.addSkill(data)){
      res.status(200).send("User skill added successfully!")
    } 
  }else{
    res.status(500).send("User does not exist.");
  }

  } catch (err) {
    console.log(err);
  } 
});

app.get("/api/getskillsbyid/:userId",async(req,res) => {

  try{
    const {userId} = req.params;
    const skills = await SkillService.getSkillbyId(userId);

    console.log("get skills method app.js:"+skills);
    if(skills)
    {
      res.status(200).send(skills);

    }
    else{
      res.status(500).send("No skills found!");
    }
  }
  catch(err){
    console.log(err);
  }
});



//Experience
app.post("/api/add_experience",async(req,res)=>{
  try {
    
console.log(req.body);
const{userId,jobtitle,company,jobstatus,startDate,endDate,description,location} =req.body;
console.log(userId + " "+jobtitle+"testing!");


if (!(jobtitle && company && jobstatus 
  && startDate && endDate && description && location)) {
  res.status(500).send("All input is required");
}

const user = await userService.getUserById(userId);
  if(user){
    const data= {
      userId:userId,
      jobtitle:jobtitle,
      company:company,
      jobstatus: jobstatus,
     startDate: startDate,
      endDate: endDate,
      description:description,
      location:location,
    };
    if(ExperienceService.addExperience(data)){
      res.status(200).send("User Experience added successfully!")
    } 
  }else{
    res.status(500).send("User does not exist.");
  }

  } catch (err) {
    console.log(err);
  } 
});

app.get("/api/getexperiencebyid/:userId",async(req,res) => {

  try{
    const {userId} = req.params;
    const experience = await ExperienceService.getExperienceById(userId);

    console.log("get experience method app.js:"+experience);
    if(experience)
    {
      res.status(200).send(experience);

    }
    else{
      res.status(500).send("No experience found!");
    }
  }
  catch(err){
    console.log(err);
  }
});

//Educational BG
app.post("/api/addCourse", function (req, res) {
  console.log(req.body);
  var eduObj = {
    school: req.body.school,
    college: req.body.college,
    course: req.body.course,
    master: req.body.master,
    masterCourse: req.body.masterCourse,
    additional: req.body.additional,
    userId: req.body.userId
}

  var result = educationalService.addCourse(eduObj);
  if (result) {
    res.send("Educational Details Added");
  } else {
    res.send("failed");
  }
});
app.post('/api/deleteCourse', function(req,res){
  var eduObj = {
    school : req.body.school,
    college : req.body.college,
    masters : req.body.masters,
    collegeCourse : req.body.collegeCourse,
    masterCourse : req.body.masterCourse,
    addditional : req.body.addditional
  }

  var result = educationalService.deleteCourse(eduObj);
  if(result) {
    res.send("Course deleted");
  }
  else{
    res.send("failed")
  }
});

app.get('/api/getCourse/:id', async (req, res) => {
  try {
    const result = await educationalService.getCourse(req.params.id);
    console.log(result);
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(500).send("Course does not exist.");
    }
  } catch (err) {
    console.log(err);
  }
});


//Professional BG
app.post("/api/addField", function (req, res) {
  console.log(req.body);
  var proObj = {
    field: req.body.field,
    orgName: req.body.orgName,
    position: req.body.position,
    technology: req.body.technology,
    timeFrom: req.body.timeFrom,
    timeTo: req.body.timeTo,
    userId: req.body.userId
}

  var result = professionalService.addField(proObj);
  if (result) {
    res.send("Professional Details Added");
  } else {
    res.send("failed");
  }
});
app.post('/api/deleteField', function(req,res){
  var proObj = {
    field: req.body.field,
    orgName: req.body.orgName,
    position: req.body.position,
    technology: req.body.technology,
    timeFrom: req.body.timeFrom,
    timeTo: req.body.timeTo
  }

  var result = professionalService.deleteField(proObj);
  if(result) {
    res.send("Field deleted");
  }
  else{
    res.send("failed")
  }
});

app.get('/api/getField/:id', async (req, res) => {
  try {
    const result = await professionalService.getField(req.params.id);
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(500).send("Field does not exist.");
    }
  } catch (err) {
    console.log(err);
  }
});

//Interest
app.post("/api/addInterest", function (req, res) {
  var intObj = {
    interest: req.body.interest,
    userId: req.body.userId
  };
//console.log(req.body.interest+"322");
  var result = interestService.addInterest(intObj);
  console.log(result+"interest");
  if (result) {
    res.send("Interest Added");
  } else {
    res.send("failed");
  }
});

app.get("/api/users", async (req, res) => {
  const users = await User.find();
  if (users) {
    res.send(users);
  }
});


app.post("/api/deleteInterest", function (req, res) {
  console.log(req.body);
  var intObj = {
    interest: req.body.interest,
  };

  var result = interestService.deleteInterest(intObj);
  if (result) {
    res.send("Interest Deleted");
  } else {
    res.send("failed");
  }
});

app.get('/api/getInterest/:id', async (req, res) => {
  try {
    const result = await interestService.getInterest(req.params.id);
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(500).send("interest does not exist.");
    }
  } catch (err) {
    console.log(err);
  }
});

//Co-workers Recommendation
app.post("/api/add_coworkers_recommendation", function (req, res) {
  console.log(req.body);
  var recObj = {
    fullName: req.body.fullName,
    position: req.body.position,
    contactNo: req.body.contactNo,
    emailId: req.body.email,
    messageContent: req.body.letter,
    userId: req.body.userId
}

  var result = recommendationService.addRecommendation(recObj);
  if (result) {
    res.send("Recommendation Added");
  } else {
    res.send("failed");
  }
});

app.get("/api/users", async (req, res) => {
  const users = await User.find();
  if (users) {
    res.send(users);
  }
});

app.post("/api/update_coworkers_recommendation", function (req, res) {
  console.log(req.body);
  var recObj = {
    fullName: req.body.fullName,
    position: req.body.position,
    contactNo: req.body.contactNo,
    emailId: req.body.emailId,
    messageContent: req.body.messageContent,
  };

  var result = recommendationService.updateRecommendation(recObj);
  if (result) {
    res.send("Recommendation Update");
  } else {
    res.send("failed");
  }
});

app.post("/api/delete_coworkers_recommendation", function (req, res) {
  var recObj = {
    emailId: req.body.emailId,
  };

  var result = recommendationService.deleteRecommendation(recObj);
  if (result) {
    res.send("Recommendation Deleted");
  } else {
    res.send("failed");
  }
});

app.get('/api/get_recommendation/:id', async (req, res) => {
  try {
    const result = await recommendationService.getRecommendation(req.params.id);
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(500).send("Recommendation does not exist.");
    }
  } catch (err) {
    console.log(err);
  }
});


// Certifications API
app.post('/api/add_certification', function (req, res) {
    var recObj = {
        certificationName: req.body.certificationName,
        organizationName: req.body.organizationName,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        description: req.body.description,
        userId: req.body.userId
    }
    
    var result =  certificationService.addCertification(recObj);
    if (result) {
        res.send("Certification Added")
    } else {
        res.send("failed")
    }
});

app.put('/api/update_certification', function (req, res) {
    var recObj = {
        schocertificationNameol: req.body.certificationName,
        organizationName: req.body.organizationName,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        description: req.body.description,
        _id: req.body._id
    }
    
    var result =  certificationService.updateCertification(recObj, req.params.id);
    if (result) {
        res.send("Certification Updated")
    } else {
        res.send("failed")
    }
});

app.delete('/api/delete_certification', function (req, res) {
    console.log(req.body);
    var recObj = {
        _id: req.body._id
    }
    
    var result =  certificationService.deleteCertification(recObj);
    if (result) {
        res.send("Certification Deleted")
    } else {
        res.send("failed")
    }
});

app.get('/api/get_certification/:id', async (req, res) => {
    const result = await certificationService.getCertification(req.params.id);
    if (result) {
        console.log(result);
        res.send(result);
    }
});
// contact
    app.post("/api/contact", async (req, res) => {
        try {
            const { userId,email,linkID,gitHubID,phone } = req.body;
        
            if (!(email && linkID && gitHubID && phone)) {
              res.status(500).send("All input is required");
            }
            const user = await userService.getUserById(userId);
            if (user) {
            const data = {
            userId: userId,
            email:email, 
            linkID:linkID,
            gitHubID:gitHubID,
            phone:phone,
    };
    if (contactService.addContact(data)) {
        res.status(200).send("User's Contact added successfully.");
      } else {
        res.status(500).send("User does not exist.");
      }
    } else {
      res.status(500).send("User does not exist.");
    }
  } catch (err) {
    console.log(err);
  }
});

  
    app.put('/api/updateContact/:email', async (req, res) => {
        var email = req.params.email;
        var contactObj = {
            linkID: req.body.linkID,
           gitHubID: req.body.gitHubID,
           phone: req.body.phone
        }
        var result = contactService.updateContact(email, contactObj);
        console.log(result)
        if (result) {
            res.send("Updated")
        } else {
            res.send("failed")
        }
    });
    
    app.delete('/api/deleteContact/:email', async (req, res) => {
        var result = contactService.deleteContact(req.params.email);
        console.log(result)
        if (result) {
            res.send("Deleted")
        } else {
            res.send("failed")
        }
    });
    

    app.get("/api/contact/:userId", async (req, res) => {
        try {
          const { userId } = req.params;
      
          const contact = await contactService.getContactById(
            userId
          );
          console.log("get Contact" + contact);
          if (contact) {
            res.status(200).send(contact);
          } else {
            res.status(500).send("Contact does not exist.");
          }
        } catch (err) {
          res.status(500).send("Contact does not exist.");
          console.log(err);
        }
      });
    
    app.get('/api/contact', async (req, res) => {
        const contacts = await Contact.find();
        if (contacts) {
            res.send(contacts);
        } else {
            res.send("failed")
        }
    });
  // project  

    app.post("/api/projectWork", async (req, res) => {
        try {
            const { userId,proName,proDesc,tech,gitHubLink,webLink } = req.body;
        
            if (!(proName && proDesc && tech && gitHubLink && webLink)) {
              res.status(500).send("All input is required");
            }
            const user = await userService.getUserById(userId);
            if (user) {
            const data = {
            userId: userId,
            proName:proName, 
            proDesc:proDesc, 
            tech:tech,
            gitHubLink:gitHubLink,
            webLink:webLink,
    };
    if (projectWorkService.addProjectWork(data)) {
        res.status(200).send("User's project added successfully.");
      } else {
        res.status(500).send("User does not exist.");
      }
    } else {
      res.status(500).send("User does not exist.");
    }
  } catch (err) {
    console.log(err);
  }
});

    app.put('/api/updateProjectWork/:proName', async (req, res) => {
        var proName = req.params.proName;
        var projectWorkObj = {

            proName : req.body.proName,
            proDesc:req.body.proDesc, 
            tech    :req.body.tech, 
            gitHubLink:req.body.gitHubLink,
             webLink:req.body.webLink
        }
        var result = projectWorkService.updateProjectWork(proName, projectWorkObj);
        console.log(result)
        if (result) {
            res.send("Updated")
        } else {
            res.send("failed")
        }
    });
    
    app.delete('/api/deleteProjectWork/:proName', async (req, res) => {
        var result = projectWorkService.deleteProjectWork(req.params.proName);
        console.log(result)
        if (result) {
            res.send("Deleted")
        } else {
            res.send("failed")
        }
    });
    


    app.get("/api/projectWork/:userId", async (req, res) => {
        try {
          const { userId } = req.params;
      
          const projectWork = await projectWorkService.getProjectWorkById(
            userId
          );
          console.log(" get project work" + projectWork);
          if (projectWork) {
            res.status(200).send(projectWork);
          } else {
            res.status(500).send("Project does not exist.");
          }
        } catch (err) {
          res.status(500).send("Project does not exist.");
          console.log(err);
        }
      });
    
    app.get('/api/projectWork', async (req, res) => {
        const projectwork = await ProjectWork.find();
        if ( projectwork) {
            res.send( projectwork);
        } else {
            res.send("failed")
        }
    });


app.listen(port);
console.log("App listening on port : " + port);