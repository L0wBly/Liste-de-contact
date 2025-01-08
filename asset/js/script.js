fetch("https://random-data-api.com/api/v2/users?size=10")
        .then(function(reponse) {
            return reponse.json();
        }).then(function(listecontact) {
            const elements = document.querySelector("#elements");

            for(const contact of listecontact) {
                const Name = document.createElement("article");

                const first_name = document.createElement("h2");
                first_name.classList.add("first_name")
                first_name.textContent = contact.first_name + " " + contact.last_name;

                const phone_number = document.createElement("a");
                phone_number.href = contact.phone_number
                phone_number.classList.add("phone_number")
                phone_number.textContent = "Phone number" + ": " +contact.phone_number;

                const email = document.createElement("a");
                email.target = "_blank"
                email.href = "mailto:" + contact.email
                email.classList.add("email")
                email.textContent = contact.email;

                const gender = document.createElement("p");
                gender.classList.add("gender")
                gender.textContent = "Gender: " +  contact.gender;

                const date_of_birth = document.createElement("p");
                date_of_birth.classList.add("date_of_birth")
                date_of_birth.textContent ="Date of Birth" + ": " + contact.date_of_birth;

                const employment = document.createElement("p");
                employment.classList.add("employment")
                employment.textContent = contact.employment.title + ", " + contact.employment.key_skill;

                const address = document.createElement("p");
                address.classList.add("address")
                address.textContent = " " + contact.address.street_address + ", " + contact.address.zip_code + ", " + contact.address.country

                const error_map = document.createElement("em");
                error_map.classList.add("error_map")
                error_map.textContent ="This address doesn't exist !!"

                const plan = document.createElement("div");

                plan.classList.add("map")

                Name.appendChild(first_name);
                Name.appendChild(phone_number);
                Name.appendChild(email);
                Name.appendChild(gender);
                Name.appendChild(date_of_birth);
                Name.appendChild(employment);
                Name.appendChild(address);
                Name.appendChild(error_map)
                Name.appendChild(plan)

                elements.appendChild(Name);

                const position = contact.address.street_address + ", " + contact.address.zip_code + " " + contact.address.country;

                fetch("https://api.geoapify.com/v1/geocode/search?text=" + position + "&apiKey=0d0d5b19824d4909ba18baeecace4500", {method: 'GET'})
                .then(response => response.json())
                .then(result => {
                    if (result && result.features && result.features[0] && result.features[0].properties) {
                        error_map.classList.add("hidden")
                        const lat = result.features[0].properties.lat;
                        const lon = result.features[0].properties.lon;

                        const latLng = L.latLng(lat, lon);
                        const map = L.map(plan).setView(latLng, 11);
                        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
                        L.marker(latLng).addTo(map);
                    } else{
                        Name.removeChild(plan)
                    }
                    
                });

            }
            
        });

        
