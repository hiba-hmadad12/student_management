const mongoose = require("mongoose");
require("dotenv").config();

const uri =
  process.env.MONGODB_URI ||
  "mongodb+srv://hibahmadad12_db_user:ydJaQOYZUB6w4WAf@cluster0.xib1r7a.mongodb.net/student_management?retryWrites=true&w=majority";

// Importer les modèles
const studentSchema = new mongoose.Schema({
  id: Number,
  firstname: String,
  lastname: String,
});

const courseSchema = new mongoose.Schema({
  id: Number,
  name: String,
  credits: Number,
});

const gradeSchema = new mongoose.Schema({
  student: {
    _id: mongoose.Schema.Types.ObjectId,
    id: Number,
    firstname: String,
    lastname: String,
  },
  course: {
    _id: mongoose.Schema.Types.ObjectId,
    id: Number,
    name: String,
  },
  grade: Number,
  date: String,
});

const Student = mongoose.model("Student", studentSchema);
const Course = mongoose.model("Course", courseSchema);
const Grade = mongoose.model("Grade", gradeSchema);

async function seedDatabase() {
  try {
    await mongoose.connect(uri, {});
    console.log("Connecté à MongoDB");

    // Vider les collections
    await Student.deleteMany({});
    await Course.deleteMany({});
    await Grade.deleteMany({});
    console.log("Collections vidées");

    // Ajouter les étudiants
    const students = await Student.insertMany([
      { id: 2128, firstname: "Matthew", lastname: "Gonzalez" },
      { id: 7912, firstname: "Kevin", lastname: "Green" },
      { id: 5589, firstname: "James", lastname: "Murphy" },
      { id: 8569, firstname: "Johnny", lastname: "Cox" },
      { id: 2864, firstname: "Cynthia", lastname: "Clay" },
      { id: 2797, firstname: "Scott", lastname: "Thompson" },
    ]);
    console.log(`${students.length} étudiants ajoutés`);

    // Ajouter les cours
    const courses = await Course.insertMany([
      { id: 1, name: "Math 101", credits: 3 },
      { id: 2, name: "Physics 505", credits: 4 },
      { id: 3, name: "Chemistry 606", credits: 3 },
      { id: 4, name: "History 303", credits: 3 },
      { id: 5, name: "Biology 404", credits: 4 },
    ]);
    console.log(`${courses.length} cours ajoutés`);

    // Ajouter les notes
    const grades = await Grade.insertMany([
      {
        student: {
          _id: students[0]._id,
          id: 2128,
          firstname: "Matthew",
          lastname: "Gonzalez",
        },
        course: { _id: courses[0]._id, id: 1, name: "Math 101" },
        grade: 99,
        date: "2023-02-10",
      },
      {
        student: {
          _id: students[1]._id,
          id: 7912,
          firstname: "Kevin",
          lastname: "Green",
        },
        course: { _id: courses[1]._id, id: 2, name: "Physics 505" },
        grade: 64,
        date: "2022-11-01",
      },
      {
        student: {
          _id: students[2]._id,
          id: 5589,
          firstname: "James",
          lastname: "Murphy",
        },
        course: { _id: courses[2]._id, id: 3, name: "Chemistry 606" },
        grade: 64,
        date: "2022-02-20",
      },
      {
        student: {
          _id: students[3]._id,
          id: 8569,
          firstname: "Johnny",
          lastname: "Cox",
        },
        course: { _id: courses[0]._id, id: 1, name: "Math 101" },
        grade: 59,
        date: "2021-11-11",
      },
      {
        student: {
          _id: students[4]._id,
          id: 2864,
          firstname: "Cynthia",
          lastname: "Clay",
        },
        course: { _id: courses[0]._id, id: 1, name: "Math 101" },
        grade: 80,
        date: "2023-04-04",
      },
      {
        student: {
          _id: students[5]._id,
          id: 2797,
          firstname: "Scott",
          lastname: "Thompson",
        },
        course: { _id: courses[3]._id, id: 4, name: "History 303" },
        grade: 99,
        date: "2022-11-07",
      },
    ]);
    console.log(`${grades.length} notes ajoutées`);

    console.log("✓ Base de données peuplée avec succès!");
    process.exit(0);
  } catch (err) {
    console.error("Erreur:", err);
    process.exit(1);
  }
}

seedDatabase();
