import { skills } from './db/skills';

const contentSkill = document.querySelector('.list-skills div');

const getSkills = ( skill ) => {
    const html = `
        <h3>${skill.skill}</h3>
        <div class="line"><span style="width: ${skill.percentage};"></span></div>
    `

    const li = document.createElement('li');
    li.innerHTML = html;
    contentSkill.appendChild(li);
}

export const initSkills = () => {
    skills.forEach( getSkills );
}