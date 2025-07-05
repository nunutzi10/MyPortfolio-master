import { skills } from "./db/skills";

const contentSkill = document.querySelector(".list-skills div");

const getSkills = (skill) => {
  const html = `
        <div class="skill">
            <figure class="skill-icon">
                <img src=${skill.imgSrc} alt=${skill.skill} width=32 height=32 />
            </figure>

            <div>
                <h3 class="skill-title">${skill.skill}</h3>
                <p class="skill-desc">
                    ${skill.desc}
                </p>
            </div>
        </div>
    `;

  const li = document.createElement("li");
  li.innerHTML = html;
  contentSkill.appendChild(li);
};

export const initSkills = () => {
  skills.forEach(getSkills);
};
