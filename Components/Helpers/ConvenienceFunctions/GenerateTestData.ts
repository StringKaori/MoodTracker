import { NewMoodType } from "../Interfaces/RequestTypes";
import { newMoodEntry } from "../RequestBase";

const data: NewMoodType[]  = [
    { id: 2, note: "Sentindo-se frustrado com o trabalho." }, // Confused
    { id: 5, note: "Preocupado com a carga de trabalho." }, // Anxious
    { id: 8, note: "" }, // Annoyed
    { id: 11, note: "Sentindo-se triste com uma situação." }, // Lonely
    { id: 14, note: "" }, // Proud
    { id: 16, note: "Sentindo-se calmo após um dia intenso." }, // Calm
    { id: 18, note: "Sentindo-se esperançoso com novos projetos." }, // Hopeful
    { id: 22, note: "" }, // Sad
    { id: 25, note: "Sentindo-se grato pelas pequenas coisas." }, // Grateful
    { id: 27, note: "Sentindo-se seguro e confortável." }, // Safe
    { id: 29, note: "" }, // Grateful
    { id: 31, note: "Sentindo-se descansado após um fim de semana." }, // Restful
    { id: 33, note: "" }, // Relaxed
    { id: 0, note: "Sentindo-se irritado com a falta de comunicação." }, // Enraged
    { id: 4, note: "Preocupado com a situação financeira." }, // Anxious
    { id: 6, note: "" }, // Repulsed
    { id: 9, note: "Sentindo-se animado com novos planos." }, // Excited
    { id: 12, note: "" }, // Energized
    { id: 15, note: "Sentindo-se contente com o progresso feito." }, // Happy
    { id: 19, note: "Sentindo-se triste com uma notícia ruim." }, // Sad
    { id: 23, note: "" }, // Lonely
    { id: 27, note: "Sentindo-se esperançoso com novos desafios." }, // Hopeful
    { id: 30, note: "Sentindo-se relaxado após o trabalho." }, // Relaxed
    { id: 32, note: "Sentindo-se confortável em casa." }, // Safe
    { id: 35, note: "" }, // Peaceful
    { id: 3, note: "Sentindo-se irritado com o trânsito." }, // Anxious
    { id: 6, note: "Sentindo-se contente com o progresso feito." }, // Repulsed
    { id: 10, note: "" }, // Energized
    { id: 13, note: "Sentindo-se animado com um novo projeto." }, // Inspired
    { id: 17, note: "Sentindo-se grato pelas pequenas coisas." }, // Grateful
    { id: 20, note: "" }, // Content
    { id: 22, note: "Sentindo-se seguro e confortável." }, // Safe
    { id: 25, note: "" }, // Grateful
    { id: 28, note: "Sentindo-se esperançoso com novas oportunidades." }, // Hopeful
    { id: 31, note: "Sentindo-se relaxado após um dia intenso." }, // Relaxed
    { id: 34, note: "" }, // Peaceful
    { id: 2, note: "Sentindo-se frustrado com a falta de progresso." }, // Confused
    { id: 6, note: "" }, // Repulsed
    { id: 10, note: "Sentindo-se animado com um novo projeto." }, // Energized
    { id: 14, note: "Sentindo-se seguro e confortável." }, // Proud
    { id: 18, note: "" }, // Hopeful
    { id: 21, note: "Sentindo-se contente com o progresso feito." }, // Nervous
    { id: 24, note: "" }, // Sad
    { id: 27, note: "Sentindo-se calmo após um dia intenso." }, // Safe
    { id: 29, note: "" }, // Grateful
    { id: 32, note: "Sentindo-se relaxado após o trabalho." }, // Hopeless
    { id: 35, note: "" }, // Content
    { id: 1, note: "Sentindo-se ansioso com uma tarefa importante." }, // Angry
    { id: 4, note: "" }, // Anxious
    { id: 8, note: "Sentindo-se animado com novos desafios." }, // Confused
    { id: 12, note: "" }, // Excited
    { id: 15, note: "Sentindo-se alegre com o fim de semana." }, // Energized
    { id: 19, note: "" }, // Happy
    { id: 21, note: "Sentindo-se triste com uma situação." }, // Sad
    { id: 25, note: "" }, // Lonely
    { id: 28, note: "Sentindo-se esperançoso com novos planos." }, // Hopeful
    { id: 30, note: "" }, // Relaxed
    { id: 34, note: "Sentindo-se confortável em casa." }, // Peaceful
    { id: 1, note: "" }, // Angry
    { id: 5, note: "Sentindo-se animado com novas oportunidades." }, // Nervous
    { id: 8, note: "" }, // Annoyed
    { id: 11, note: "Sentindo-se inspirador com uma nova ideia." }, // Inspired
    { id: 15, note: "" }, // Energized
    { id: 18, note: "Sentindo-se grato pelas pequenas coisas." }, // Grateful
    { id: 21, note: "" }, // Sad
    { id: 24, note: "Sentindo-se calmo e relaxado." }, // Calm
    { id: 27, note: "" }, // Peaceful
    { id: 31, note: "Sentindo-se seguro e confortável." }, // Safe
    { id: 33, note: "" }, // Relaxed
    { id: 2, note: "Sentindo-se frustrado com a falta de progresso." }, // Confused
    { id: 5, note: "" }, // Anxious
    { id: 9, note: "Sentindo-se animado com novos planos." }, // Excited
    { id: 12, note: "" }, // Energized
    { id: 15, note: "Sentindo-se alegre com o fim de semana." }, // Happy
    { id: 18, note: "" }, // Sad
    { id: 22, note: "Sentindo-se calmo após uma semana movimentada." }, // Calm
    { id: 26, note: "" }, // Safe
    { id: 29, note: "Sentindo-se grato pelas pequenas coisas." }, // Grateful
    { id: 32, note: "" }, // Hopeless
    { id: 35, note: "Sentindo-se confortável e relaxado." }, // Content
    { id: 1, note: "Sentindo-se irritado com um problema persistente." }, // Angry
    { id: 4, note: "" }, // Anxious
    { id: 7, note: "Sentindo-se inspirado com um novo projeto." }, // Anxious
    { id: 11, note: "Sentindo-se energizado com uma nova oportunidade." }, // Excited
    { id: 14, note: "" }, // Proud
    { id: 17, note: "Sentindo-se tranquilo e relaxado." }, // Calm
    { id: 20, note: "" }, // Grateful
    { id: 24, note: "Sentindo-se esperançoso com o futuro." }, // Hopeful
    { id: 27, note: "" }, // Relaxed
    { id: 30, note: "Sentindo-se confortável com a situação atual." }, // Safe
    { id: 33, note: "" }, // Peaceful
    { id: 1, note: "Sentindo-se ansioso com um prazo iminente." }, // Angry
    { id: 4, note: "" }, // Anxious
    { id: 8, note: "Sentindo-se grato pelo apoio recebido." }, // Repulsed
    { id: 11, note: "" }, // Anxious
    { id: 15, note: "Sentindo-se feliz com um progresso recente." }, // Happy
    { id: 19, note: "" }, // Sad
    { id: 22, note: "Sentindo-se relaxado após um fim de semana." }, // Relaxed
    { id: 25, note: "" }, // Safe
    { id: 28, note: "Sentindo-se grato pelas pequenas vitórias." }, // Grateful
    { id: 32, note: "" }, // Safe
    { id: 35, note: "Sentindo-se confortável e em paz." } // Peaceful
];

export default function generateTestData() {
    data.forEach(body => {
        newMoodEntry(body)
         .then((data) => {
         })

         .catch((error) => {
         });
    })
}