const namea = document.getElementById("name");
const email = document.getElementById("email");
const rollno = document.getElementById("rollno");
const submit = document.getElementById("submit");

// Valid name Function
function validname(name) {
  const namerule = /^[A-Z][A-Za-z\s]{1,29}$/;
  return namerule.test(name);
}

// Valid email Function
function validemail(email) {
  const emailrule = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailrule.test(email);
}

// Valid Erpid Function
function validerp(erp) {
  return erp > 10000 && erp <= 50000;
}

// Error function
function showerror(input, message) {
  let error = input.parentElement.querySelector(".error");
  if (!error) {
    error = document.createElement("small");
    error.className = "error";
    input.parentElement.appendChild(error);
  }
  error.textContent = message;
}

// Error remove
function errorremove(input) {
  const error = input.parentElement.querySelector(".error");
  if (error) error.remove();
}

// Submit Check
submit.addEventListener("click", async (event) => {
  event.preventDefault();
  // Checking all the fields
  if (namea.value === "" && email.value === "" && rollno.value === "") {
    alert("Enter the details");
    return;
  }

  // for removing error
  let valid = true;

  // Name check rule
  const namecheck = namea.value.trim();
  if (!validname(namecheck)) {
    showerror(namea, "Enter valid name");
    valid = false;
  } else {
    errorremove(namea);
  }

  // Email check rule
  const emailcheck = email.value.trim();
  if (!validemail(emailcheck)) {
    showerror(email, "Enter valid email");
    valid = false;
  } else {
    errorremove(email);
  }

  // Erp check rule
  const erpcheck = rollno.value.trim();
  if (!validerp(erpcheck)) {
    showerror(rollno, "Enter valid rollno");
    valid = false;
  } else {
    errorremove(rollno);
  }

  if (!valid) {
    return;
  }

  // alert("Form Submitted");
  try {
    const response = await fetch("http://localhost:3000/students/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: namea.value,
        email: email.value,
        rollno: rollno.value,
      }),
    });

    if (response.ok) {
      alert("Form submitted Successfully");
      namea.value = "";
      email.value = "";
      rollno.value = "";
    }
  } catch (error) {
    console.log(error)
    // const errorMessage = document.createElement("p");
    // errorMessage.textContent = "Error Fetching Data";
    // document.body.appendChild(errorMessage);
  }
});
