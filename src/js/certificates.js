import { certificates } from './db/certificates';

const contentCertificates = document.querySelector('.content-certi');

const getCertificates = ( certificate ) => {

    let html = `
    <div class="content-cimg">
        <img src="${certificate.img}" alt="">

        <div class="certificates-panel">
            <div>
                <div class="cheader-panel">
                    <span>${certificate.title}</span>
                </div>
                <div class="cicons-panel">
                    <a href=${certificate.linkc} class="cicon" target="_blank">
                        <i class='bx bxs-graduation'></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
    `

    const div = document.createElement('div');
    div.innerHTML = html;
    contentCertificates.appendChild(div);

}

export const initCertificates = () => {
    certificates.forEach( getCertificates );
}