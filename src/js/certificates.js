import { certificates } from "./db/certificates";

const contentCertificates = document.querySelector(".content-certi");

const getCertificates = (certificate) => {
  let html = `
        <div class="certificate">
            <figure class="certificate-icon">
                <img src=${certificate.img} alt=${certificate.title} width=32 height=32 />
            </figure>

            <div>
                <h3 class="certificate-title">${certificate.title}</h3>
                <a href=${certificate.linkc} target="_blank" class="certificate-desc">
                    Certificate Link
                </p>
            </div>
        </div>
    `;

  const div = document.createElement("div");
  div.innerHTML = html;
  contentCertificates.appendChild(div);
};

export const initCertificates = () => {
  certificates.forEach(getCertificates);
};
