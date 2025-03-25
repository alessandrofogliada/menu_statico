     document.addEventListener("DOMContentLoaded", function () {
        const btnAntipasti = document.getElementById("btnAntipasti");
        const btnPrimi = document.getElementById("btnPrimi");
        const btnSecondi = document.getElementById("btnSecondi");
        const btnDolci = document.getElementById("btnDolci");
        const menuContainer = document.getElementById("menu");
        const loaderWrapper = document.getElementById("loader-wrapper");
      
        const menuUrl = "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLgeN-jf4cZ6EaXeKfJM8-BucgdnOfmo8oZoR6qSofDYUDXzODncwwaViXg6tWPGfsPMIJiMqYrn-xgfTwfUNKB6NesUZ_oO9MeP3adbwWF3hoN_GdTDrdXRQvFjpAdsSXehImtVy8lnM1oYXBBqdvSdCS-MKLRxwrVo-mbkSqYTN5FlKs6ho9micnYYbrlNSZySB-WMBT1iepQUG7oOowV_0dUoNobLA7QyDABwZ8K_XCbDkbpeVi_CsTbMhG-CyT7ap6Dj6QJheCTMd5b5_GL40NxDwA&lib=MykT1k49E1ZtdOPj_mjXXjz3FZZAEnAtP";
      
        let menuData = {}; // cache dei dati
      
        function showLoader() {
            loaderWrapper.style.display = "block";
            menuContainer.style.display = "none";
          }
          
          function hideLoader() {
            loaderWrapper.style.display = "none";
            menuContainer.style.display = "block";
          }
          
      
        function renderMenu(categoria) {
          const piatti = menuData[categoria];
      
          if (!piatti) {
            menuContainer.innerHTML = `<p style="color: red;">Nessun dato trovato per ${categoria}</p>`;
            hideLoader();
            return;
          }
      
          menuContainer.innerHTML = `<h2>${categoria}</h2>`;
          piatti.forEach(item => {
            const menuItem = document.createElement("div");
            menuItem.classList.add("menu-item", "mb-4", "p-3", "border", "rounded");
            menuItem.innerHTML = `
              <h4>${item["Nome piatto"] || "Senza nome"}</h4>
              <p><strong>Ingredienti:</strong> ${item["Ingredienti"] || "-"}</p>
              <p><strong>Prezzo:</strong> ${item["Prezzo"] || "-"}</p>
              <p><em>${item["Info"] || ""}</em></p>
              <hr>
            `;
            menuContainer.appendChild(menuItem);
          });
      
          hideLoader();
        }
      
        function fetchMenuData(categoria) {
          showLoader();
          if (Object.keys(menuData).length === 0) {
            fetch(menuUrl)
              .then(res => res.json())
              .then(data => {
                menuData = data;
                renderMenu(categoria);
              })
              .catch(err => {
                console.error("Errore nel caricamento:", err);
                menuContainer.innerHTML = "<p style='color:red;'>Errore nel caricamento del menu.</p>";
                hideLoader();
              });
          } else {
            renderMenu(categoria); // già in cache
          }
        }
      
        // Eventi click
        btnAntipasti.addEventListener("click", () => fetchMenuData("Antipasti"));
        btnPrimi.addEventListener("click", () => fetchMenuData("Primi"));
        btnSecondi.addEventListener("click", () => fetchMenuData("Secondi"));
        btnDolci.addEventListener("click", () => fetchMenuData("Dolci"));
      });
      