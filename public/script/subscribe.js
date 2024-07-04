document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed");
  
    emailjs.init("KkZA4aQ8jT7U5DNtw"); // Replace with your EmailJS public key
  
    const submitButton = document.querySelector(".sub-btn");
  
    if (submitButton) {
      console.log("Submit button found and event listener is being set.");
  
      submitButton.addEventListener("click", function() {
        console.log("Submit button clicked.");
  
        const name = document.querySelector("input[name='name']").value;
        const email = document.querySelector("input[name='email']").value;
  
        if (name && email) {
          console.log("Name and email entered:", name, email);
          
          // Send email using EmailJS
          emailjs.send("service_f2nmqem", "template_s0jrlrw", {
            to_name: "Gordian Knot Capital",
            from_name: name,
            user_email: email, // Ensure this matches the variable in your EmailJS template
            message: `Name: ${name}, Email: ${email}`
          }).then(function(response) {
            console.log("SUCCESS!", response.status, response.text);
            alert("Thank you for subscribing, you will receive notifications when we have some activity updates");
          }, function(error) {
            console.log("FAILED...", error);
            alert("There was an error with your subscription. Please try again.");
          });
        } else {
          console.log("Missing name or email.");
          alert("Please enter both your name and email.");
        }
      });
    } else {
      console.log("Submit button not found.");
    }
  });
  