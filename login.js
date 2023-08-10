document.addEventListener("DOMContentLoaded",()=>{

    let form = document.getElementById("login-form")

    form.addEventListener("submit", async(e)=>{
        e.preventDefault();

        let email = document.getElementById("email").value
        let password = document.getElementById("password").value

        const logindata = {
            email,
            password
        };

        try {
            const response = await fetch("https://reqres.in/api/login",{
                method: "POST",
                headers:{
                    'content-type':"application/json",
                },
                body:JSON.stringify(logindata),
            });

            if(response.ok){
                const data = await response.json()
                console.log('data',data);
                localStorage.setItem("token", data.token);
                window.location.href = "dashboard.html";
            }
            else{
                console.log("err")
            }
        } catch (error) {
            console.log("error",error)
        }
    })
})