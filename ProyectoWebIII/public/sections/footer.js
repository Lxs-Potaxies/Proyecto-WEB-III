class Footer extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `<div class="footer-container">
                <div class="footer-section">
                    <strong>Contact:</strong><br/>
                    <a href="mailto:soporte.cpp.ac.cr?subject=Request for information"> Email: soporte.cpp.ac.cr</a><br />
                    <a href="web:www.utn.ac.cr?subject=Request for information"> Official Website: www.colegiopotaxie.cr</a><br />
                    Phone: 2435-5000 <br />
                    <a href="about.html">About Us</a>
                </div>

               
                
                <div class="footer-section">
                    Platform for uploading research papers<br/>
                    for the Colegio Potaxiano de Puntarenas!<br/>
                    © 2015 UTN All Rights Reserved
                </div>

                <div class="footer-section">
                    <a href="https://www.facebook.com" class="social-icon"><i class="fa fa-2x fa-facebook"></i></a>
                    <a href="https://twitter.com" class="social-icon"><i class="fa fa-2x fa-twitter"></i></a>
                    <a href="https://www.youtube.com" class="social-icon"><i class="fa fa-2x fa-youtube" ></i></a>
                    <a href="https://www.instagram.com" class="social-icon"><i class="fa fa-2x fa-instagram"></i></a>
                </div>
            </div>`;
    }
}

customElements.define('footer-component', Footer);
