import {useState} from "react";
import bugImageUrl from '../../assets/bug.svg';
import ideaImageUrl from '../../assets/idea.svg';
import thoughtImageUrl from '../../assets/thought.svg';
import {FeedbackTypeStep} from "./Steps/FeedbackTypeStep";
import {FeedbackContentStep} from "./Steps/FeedbackContentStep";
import {FeedbackSuccessStep} from "./Steps/FeedbackSuccessStep";

//Array de feedbacks possíveis
export const feedbackTypes = {
    BUG:{
        title: 'Problema',
        image: {
            source: bugImageUrl,
            alt: 'Imagem de um inseto'
        }
    },
    IDEA:{
        title: 'Ideia',
        image: {
            source: ideaImageUrl,
            alt: 'Imagem de uma lampada'
        }
    },
    OTHER:{
        title: 'Outro',
        image: {
            source: thoughtImageUrl,
            alt: 'Imagem de um balão de pensamento'
        }
    },
};

//Tipos de feedback a serem recebidos baseados nas chaves do Array 'feedbackTypes' ( BUG | IDEA | OTHER)
export type Feedbacktype = keyof typeof feedbackTypes;

export function WidgetForm() {

    //feedbackType armazena o valor do feedback do tipo Feedbacktype
    //setFeedbackType função que altera o valor da variável feedbackType
    const [feedbackType, setFeedbackType] = useState<Feedbacktype | null>(null)

    const [feedbackSent, setFeedbackSent] = useState(false)

    //Reseta o valor de feedbackType para o estado inicial 'null'
    function handleRestartFeedback(){
        setFeedbackSent(false)
        setFeedbackType(null);
    }

    return(
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">

            {feedbackSent ? (
                <FeedbackSuccessStep
                onFeedbackRestartRequested={handleRestartFeedback}
                />
            ) : (
                <>
                    {!feedbackType ? (
                    <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
                    ) : (
                    <FeedbackContentStep
                    feedbackType={feedbackType}
                    onFeedbackRestartRequested={handleRestartFeedback}
                    onFeedbackSent={() => setFeedbackSent(true)}
                    />
                    )}
                </>
            )}

            <footer className="text-xs text-neutral-400">
                Feito com ♥ pela <a className="underline underline-offset-1" href="http://rocketseat.com.br">Rocketseat</a>
            </footer>
        </div>
    );
}