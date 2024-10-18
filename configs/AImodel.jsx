/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
 
    export const generateCourseLayout_AI = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate A Course Tutorial on Following\nDetails With field as Course Name, Description, Along with Chapter Name, about, Duration: Category: 'Programming', Topic: Python, Level:Beginner, Duration: 1 hours, No of Chapters:5, in JSON format"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"courseName\": \"Python for Beginners\",\n  \"description\": \"This course provides a comprehensive introduction to Python programming, covering the fundamentals of syntax, data types, operators, control flow, functions, and more. By the end of the course, you will be able to write basic Python programs and understand the core concepts of this versatile language.\",\n  \"chapters\": [\n    {\n      \"name\": \"Introduction to Python\",\n      \"about\": \"Learn about the history of Python, its advantages, and how to set up your programming environment.\",\n      \"duration\": \"20 minutes\"\n    },\n    {\n      \"name\": \"Variables and Data Types\",\n      \"about\": \"Understand how to create variables, assign values, and work with different data types like integers, floats, strings, and booleans.\",\n      \"duration\": \"25 minutes\"\n    },\n    {\n      \"name\": \"Operators and Expressions\",\n      \"about\": \"Explore various operators like arithmetic, comparison, logical, and assignment, and learn how to construct expressions in Python.\",\n      \"duration\": \"20 minutes\"\n    },\n    {\n      \"name\": \"Control Flow Statements\",\n      \"about\": \"Master conditional statements (if-else) and loops (for and while) to control the flow of execution in your programs.\",\n      \"duration\": \"25 minutes\"\n    },\n    {\n      \"name\": \"Functions and Modules\",\n      \"about\": \"Learn how to define your own functions to organize code, reuse logic, and improve readability. Discover the concept of modules and how to import them.\",\n      \"duration\": \"20 minutes\"\n    }\n  ],\n  \"category\": \"Programming\",\n  \"topic\": \"Python\",\n  \"level\": \"Basic\",\n  \"duration\": \"1 hour\",\n  \"noOfChapters\": 5\n}\n```\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "\nGenerate A Course Tutorial on Following\nDetails With field as Course Name, Description, Along with Chapter Name, about, Duration: Category: 'Programming', Topic: Python, Level:Beginner, Duration: 1 hours, No of Chapters:5, in JSON format\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"courseName\": \"Python Basics: Your First Steps\",\n  \"description\": \"Embark on your Python journey with this beginner-friendly course! We'll cover the essential building blocks of Python programming, from understanding variables and data types to writing simple programs. No prior coding experience is required.\",\n  \"chapters\": [\n    {\n      \"name\": \"Welcome to Python\",\n      \"about\": \"Get introduced to Python, its uses, and why it's a great language to learn. We'll set up your coding environment and write your first lines of code!\",\n      \"duration\": \"15 minutes\"\n    },\n    {\n      \"name\": \"Working with Data\",\n      \"about\": \"Learn about different types of data in Python: numbers, text, and booleans. We'll explore how to store and manipulate this data using variables.\",\n      \"duration\": \"15 minutes\"\n    },\n    {\n      \"name\": \"Making Decisions\",\n      \"about\": \"Discover how to control the flow of your programs using 'if' statements and 'else' blocks. Learn to make decisions based on conditions.\",\n      \"duration\": \"15 minutes\"\n    },\n    {\n      \"name\": \"Repeating Actions\",\n      \"about\": \"Master loops to repeat blocks of code efficiently. We'll cover 'for' loops for iterating through sequences and 'while' loops for repeating actions based on conditions.\",\n      \"duration\": \"15 minutes\"\n    },\n    {\n      \"name\": \"Putting It All Together\",\n      \"about\": \"In this final chapter, we'll build a small project using the concepts you've learned. This hands-on experience will solidify your understanding.\",\n      \"duration\": \"15 minutes\"\n    }\n  ],\n  \"category\": \"Programming\",\n  \"topic\": \"Python\",\n  \"level\": \"Beginner\",\n  \"duration\": \"1 hour\",\n  \"noOfChapters\": 5\n}\n```"},
          ],
        },
      ],
    });


   export const GenerateChapterContent_AI = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          parts: [
            {text: "Explain the concept in Detail on Topic: Java, Chapter: Variables and Data Types, in JSON Format with a list of array field as title, explanation on a given chapter in detail, Code Example(Code field in <precode> format) if applicable"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"title\": \"Java Variables and Data Types\",\n  \"explanation\": \"This chapter introduces the fundamental concepts of variables and data types in Java.  Variables act as containers for storing data in your programs, while data types specify the kind of data a variable can hold.\",\n  \"topics\": [\n    {\n      \"title\": \"Variables\",\n      \"explanation\": \"Variables are named locations in memory where data is stored. They allow you to manipulate and access data throughout your programs.\",\n      \"code\": \"<precode>\\nint age = 25; // Declares an integer variable 'age' and assigns the value 25\\nString name = \\\"John Doe\\\"; // Declares a String variable 'name' and assigns the text \\\"John Doe\\\"\\n</precode>\"\n    },\n    {\n      \"title\": \"Data Types\",\n      \"explanation\": \"Data types define the kind of data a variable can hold. Java provides various data types, each with its own characteristics and purpose.\",\n      \"subtopics\": [\n        {\n          \"title\": \"Primitive Data Types\",\n          \"explanation\": \"Primitive data types represent basic data values.  They are directly supported by the Java Virtual Machine.\",\n          \"types\": [\n            {\n              \"name\": \"byte\",\n              \"description\": \"Stores whole numbers from -128 to 127 (8 bits)\",\n              \"example\": \"<precode>byte myByte = 10;</precode>\"\n            },\n            {\n              \"name\": \"short\",\n              \"description\": \"Stores whole numbers from -32,768 to 32,767 (16 bits)\",\n              \"example\": \"<precode>short myShort = 20000;</precode>\"\n            },\n            {\n              \"name\": \"int\",\n              \"description\": \"Stores whole numbers from -2,147,483,648 to 2,147,483,647 (32 bits)\",\n              \"example\": \"<precode>int myInt = 1000000;</precode>\"\n            },\n            {\n              \"name\": \"long\",\n              \"description\": \"Stores large whole numbers from -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807 (64 bits)\",\n              \"example\": \"<precode>long myLong = 9000000000L;</precode>\"\n            },\n            {\n              \"name\": \"float\",\n              \"description\": \"Stores single-precision floating-point numbers (32 bits)\",\n              \"example\": \"<precode>float myFloat = 3.14f;</precode>\"\n            },\n            {\n              \"name\": \"double\",\n              \"description\": \"Stores double-precision floating-point numbers (64 bits)\",\n              \"example\": \"<precode>double myDouble = 3.141592653589793;</precode>\"\n            },\n            {\n              \"name\": \"boolean\",\n              \"description\": \"Stores truth values (true or false)\",\n              \"example\": \"<precode>boolean isTrue = true;</precode>\"\n            },\n            {\n              \"name\": \"char\",\n              \"description\": \"Stores single characters (16 bits)\",\n              \"example\": \"<precode>char myChar = 'A';</precode>\"\n            }\n          ]\n        },\n        {\n          \"title\": \"Reference Data Types\",\n          \"explanation\": \"Reference data types represent objects, which are more complex data structures. They store references to memory locations where objects reside.\",\n          \"examples\": [\n            {\n              \"name\": \"String\",\n              \"description\": \"Stores sequences of characters\",\n              \"example\": \"<precode>String myString = \\\"Hello World!\\\";</precode>\"\n            },\n            {\n              \"name\": \"Arrays\",\n              \"description\": \"Stores collections of elements of the same data type\",\n              \"example\": \"<precode>int[] myArray = {1, 2, 3, 4, 5};</precode>\"\n            },\n            {\n              \"name\": \"Classes\",\n              \"description\": \"Blueprints for creating objects with custom attributes and methods\",\n              \"example\": \"<precode>\\npublic class MyObject { // Class declaration\\n    int value;\\n}\\n\\nMyObject myObject = new MyObject(); // Object creation\\n</precode>\"\n            }\n          ]\n        }\n      ]\n    },\n    {\n      \"title\": \"Variable Declaration\",\n      \"explanation\": \"Declaring a variable involves specifying its data type and name.\",\n      \"code\": \"<precode>\\nint age; // Declares an integer variable named 'age'\\nString name; // Declares a String variable named 'name'\\n</precode>\"\n    },\n    {\n      \"title\": \"Variable Initialization\",\n      \"explanation\": \"Initialization assigns an initial value to a variable when it is declared.\",\n      \"code\": \"<precode>\\nint age = 25; // Declares and initializes 'age' to 25\\nString name = \\\"John Doe\\\"; // Declares and initializes 'name' to \\\"John Doe\\\"\\n</precode>\"\n    },\n    {\n      \"title\": \"Variable Assignment\",\n      \"explanation\": \"Assigning a new value to a variable after it has been declared.\",\n      \"code\": \"<precode>\\nage = 30; // Assigns the value 30 to the 'age' variable\\nname = \\\"Jane Doe\\\"; // Assigns the value \\\"Jane Doe\\\" to the 'name' variable\\n</precode>\"\n    }\n  ]\n}\n```"},
          ],
        },
      ],
    });
  
   // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
   // console.log(result.response.text());
