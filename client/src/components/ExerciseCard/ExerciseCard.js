import React, {useState} from 'react'
import ExerciseQuestion from '../ExerciseQuestion/ExerciseQuestion';

const ExerciseCard = () => {
    const [isShowAnswerClicked, setShowAnswer] = useState(false);
    const [exercises, setExercises] = useState([
        {
            "sub_category":["LÄS"],
            "exercise_id":"2020-10-25_4_17-20",
            "category":"KVA",
            "questions":[
                {
                    "answer_options":["De försvårar själva undervisningen.","De vägleder den pedagogiska forskningen.","De styr utbildningspolitiken.","De ersätter utbildningsdebatten."],
                    "difficulty":{"$numberDouble":"0.5"},
                    "question":"Vilken roll spelar internationella jämförande kunskapsmätningar som PISA, PIRLS och TIMSS i Sverige, enligt textförfattaren?",
                    "correct_answer":{"$numberInt":"1"},
                    "solution":"Sannolikheten betecknas (Gynnsamma utfall)/(Möjliga utfall) \\n Antalet möjliga utfall är lika för Kvantitet I och Kvantitet II. \\n Men det finns enbart ett gynnsamt utfall för Kvantitet I: 1 (samtliga tärningar visar 5) \\n medan det för Kvantitet II finns fler (15=5+5+5=6+6+3).\n Kvantitet II måste därför vara större."
                },
                {
                    "answer_options":["Forskarna anser att enkla frågor skymmer de större frågorna.","Forskarna har svårt att utmana politikerna på deras arena.","Forskarna studerar ofta andra frågor än de som debatteras.","Forskarna upplever inte att de gynnas av att delta i debatten."],
                    "difficulty":{"$numberDouble":"0.5"},
                    "question":"Vad menar textförfattaren med att pedagogikforskarnas ”lågmäldhet” till viss del är ett ”incitamentsfenomen”?",
                    "correct_answer":{"$numberInt":"1"},
                    "solution":"Sannolikheten betecknas (Gynnsamma utfall)/(Möjliga utfall) \\n Antalet möjliga utfall är lika för Kvantitet I och Kvantitet II. \\n Men det finns enbart ett gynnsamt utfall för Kvantitet I: 1 (samtliga tärningar visar 5) \\n medan det för Kvantitet II finns fler (15=5+5+5=6+6+3).\n Kvantitet II måste därför vara större."
                },
                {
                    "answer_options":["Forskningen skulle komma till bättre användning.","Forskningen skulle få starkare verklighetsförankring.","Forskningen skulle enklare kunna utvärderas.", "Forskningen skulle bli lättare att förstå."],
                    "difficulty":{"$numberDouble":"0.5"},
                    "question":"Vad vore enligt textförfattaren en fördel med att pedagogikforskarna deltog mer i samhällsdebatten?",
                    "correct_answer":{"$numberInt":"1"},
                    "solution":"Sannolikheten betecknas (Gynnsamma utfall)/(Möjliga utfall) \\n Antalet möjliga utfall är lika för Kvantitet I och Kvantitet II. \\n Men det finns enbart ett gynnsamt utfall för Kvantitet I: 1 (samtliga tärningar visar 5) \\n medan det för Kvantitet II finns fler (15=5+5+5=6+6+3).\n Kvantitet II måste därför vara större."
                },
                {
                    "answer_options":["De försvårar själva undervisningen.","De vägleder den pedagogiska forskningen.","De styr utbildningspolitiken.","De ersätter utbildningsdebatten."],
                    "difficulty":{"$numberDouble":"0.5"},
                    "question":"Vilken roll spelar internationella jämförande kunskapsmätningar som PISA, PIRLS och TIMSS i Sverige, enligt textförfattaren?",
                    "correct_answer":{"$numberInt":"1"},
                    "solution":"Sannolikheten betecknas (Gynnsamma utfall)/(Möjliga utfall) \\n Antalet möjliga utfall är lika för Kvantitet I och Kvantitet II. \\n Men det finns enbart ett gynnsamt utfall för Kvantitet I: 1 (samtliga tärningar visar 5) \\n medan det för Kvantitet II finns fler (15=5+5+5=6+6+3).\n Kvantitet II måste därför vara större."
                },
            ],
            "description": {
                "description_header": "Utbildningspolitik och pedagogisk forskning",
                "description_body": [
                    "Frågor som rör skola och utbildning har under senare år blivit allt viktigare i den offentliga debatten. Folk i allmänhet engagerar sig i skolfrågor på ett sätt som vi inte känner igen ens från de stora utbildningsreformerna i början av 1990-talet. Samtidigt med denna glädjande utveckling kan vi konstatera att den pedagogiska forskningen tappar inflytande i utbildningspolitiken och att lärare och forskare sällan hörs i skoldebatten.",
                    "Detta fenomen uppmärksammades intressant nog i en statlig utredning redan 2001. Utredarna skriver i betänkandet Samverkande styrning att pedagogernas frånvaro i debatten kan förklaras med debattens ”enfrågekaraktär”. Pedagogerna anser att den förenklade debatten både skadar skolan och trivialiserar deras eget arbete, får det att framstå som om det bestod av ”relativt okomplicerade överväganden, som nästintill vem som helst skulle kunna utföra”.",
                    "Jämför man med 1960-talets stora utbildningsreformer, som i stor utsträckning var förankrade i resultat från storskaliga forskningsstudier, ser man att dagens pedagogiska forskning har minimalt inflytande över utbildningspolitikens innehåll. Internationella jämförande kunskapsmätningar som PISA, PIRLS och TIMSS har övertagit forskningens roll som utbildningspolitisk riktningsgivare, och utbildningsministern har i olika sammanhang hävdat att svensk pedagogisk forskning ”inte håller måttet”. Om så vore fallet finns det anledning att fråga sig vad landets alla professorer, lektorer och doktorander i pedagogik håller på med.",
                    "Det kan vara intressant att fundera över konsekvenserna av en sådan inställning till den forskning staten själv finansierar. Även i Norge har resultaten från internationella kunskapsmätningar fått politiska konsekvenser och där vållat näst intill ett nationellt trauma. Men till skillnad från i Sverige väljer man att söka stöd i den pedagogiska forskningen för att analysera problemet och finna lösningar. Sålunda bjöd den norska statsministern och kunskapsministern in sex av landets pedagogikprofessorer till en diskussion om hur man gemensamt skulle kunna förbättra den norska skolan. Forskningen tas seriöst samtidigt som forskarna själva tvingas visa på vilket sätt deras resultat kan komma till användning.",
                    "Ett visst mått av självrannsakan när det gäller de svenska pedagogikforskarnas låga profil i utbildningsdebatten är emellertid befogad. Det är förvånande hur frånvarande man varit (och fortfarande är) när det svenska utbildningssystemet nu genomgår sin mest genomgripande förändring på decennier. Till viss del kan tystlåtenheten säkert förklaras med det akademiska belöningssystemet, där vetenskapliga artiklar ger poäng medan engagemang i debatten utgör en riskfylld sysselsättning. Detta trots att den så kallade tredje uppgiften enligt högskolelagen innebär att ”samverka med det omgivande samhället och informera om sin verksamhet samt verka för att forskningsresultat tillkomna vid högskolan kommer till nytta”.",
                    "Det är emellertid alltför enkelt att förklara forskarnas lågmäldhet som enbart ett incitamentsfenomen. Vad det handlar om är snarare den förändring som den mediala debattarenan genomgått under senare år. Oppositionen har få invändningar mot regeringens skolpolitik, och det ”otålighetssyndrom” som idag präglar debatten ger föga utrymme för vetenskapliga analyser av komplicerade fenomen som lärande, socialisation och undervisning. Det är inte lätt för en forskare att ta poäng på en driven retoriker som utbildningsministern, som dessutom hanterar fakta på ett sätt som ingen vetenskapligt skolad debattör skulle kunna göra. Men än värre är att viktiga utbildningspolitiska frågor skyms av frågor på detaljnivå, till exempel den kommande skollagens krav på näringsriktig kost, kvarsittning eller lärares rätt att beslagta elevers tillhörigheter.",
                    "Det är emellertid alltför enkelt att förklara forskarnas lågmäldhet som enbart ett incitamentsfenomen. Vad det handlar om är snarare den förändring som den mediala debattarenan genomgått under senare år. Oppositionen har få invändningar mot regeringens skolpolitik, och det ”otålighetssyndrom” som idag präglar debatten ger föga utrymme för vetenskapliga analyser av komplicerade fenomen som lärande, socialisation och undervisning. Det är inte lätt för en forskare att ta poäng på en driven retoriker som utbildningsministern, som dessutom hanterar fakta på ett sätt som ingen vetenskapligt skolad debattör skulle kunna göra. Men än värre är att viktiga utbildningspolitiska frågor skyms av frågor på detaljnivå, till exempel den kommande skollagens krav på näringsriktig kost, kvarsittning eller lärares rätt att beslagta elevers tillhörigheter.",
                    "De föreslagna förändringarna var betydande. Till exempel skulle nuvarande målsystem ersättas med ett system där kunskapskrav formuleras för eleverna från tio års ålder. Intressant nog hade socialdemokraterna enbart marginella invändningar i utskottsbehandlingen, trots att den nya läroplanen, till skillnad från de tidigare, tydligt markerade att det nu i högre grad än tidigare var elevens eget ansvar att uppfylla de krav som skolan ställer. Inte heller hade de elva lärosäten som lämnade remissvar på betänkandet några allvarligare invändningar.",
                    "Det andra exemplet handlar om förslaget till en ny lärarutbildning. För några år sedan överlämnades betänkandet till regeringen och gick sedan ut på remiss. Bland landets universitet och högskolor var reaktionerna blandade.Typiskt var att kritiken mer handlade om struktu­rella aspekter än innehållsliga. Man var (inte oväntat) kritisk till en förkortad förskollärarutbildning, fasta ämneskombinationer och en hårdare centralstyrning. Men märkligt nog var det få remissinstanser som reagerade mot den förändrade syn på barns och ungas lärande som präglade förslaget. Utredaren talade om ”den dyslektiska hjärnan”; barns förmåga att bedöma kvantiteter jämfördes med däggdjurs och beteendestörningar sades leda till social misär. Att pedagogisk forskning sågs som betydelselös blev tydligt när man skrev att den nya lärarutbildningen måste få en fast grund av vetenskapligt baserade kunskaper som ”inrymmer bidrag från modern hjärnforskning, utvecklingspsykologi, kognitiv psykologi, differentialpsykologi, socialpsykologi, sociologi och framför allt pedagogisk psykologi”. För första gången i svensk utbildningshistoria föreslogs en lärarutbildning där pedagogik som vetenskaplig bas inte nämndes.",
                    "Det finns anledning att hysa oro över den pedagogiska forskningens och dess företrädares osynlighet i utbildningsdebatten. Utbildningspolitiken har förlorat sin ideologiska dimension och hackas sönder i detaljfrågor. Samtidigt har den engagerade och intresserade allmänheten rätt att få ta del av skolforskningens resultat och analyser. Även om den vetenskapliga argumentationen står sig slätt mot den populistiska retoriken, borde man kunna kräva att forskarna tar sitt samhällsansvar och ger sig in i debatten så att deras forskningsresultat kommer till nytta.",
                    "Bengt Persson",
                    "* Den nu gällande läroplanen, Lgr11, trädde i kraft året efter det att denna text publicerades."
                ]}
        },
        // {
        //     "sub_category":["Stapeldiagram"],
        //     "exercise_id":"2020-10-25_5_34",
        //     "category":"DTK",
        //     "questions":[{
        //         "answer_options":["45 procent","50 procent","60 procent","65 procent"],
        //         "difficulty":{"$numberDouble":"0.5"},
        //         "question":"Hur stor andel av industrins totala utgifter för miljöskydd 2011 utgjordes av löpande kostnader?",
        //         "correct_answer":{"$numberInt":"1"},
        //         "solution":""
        //     },
        //     {
        //         "answer_options":["Övrigt","Avfall","Vatten","Luft"],
        //         "difficulty":{"$numberDouble":"0.5"},
        //         "question":"Inom vilket miljöområde gjordes miljöskyddsinvesteringar för i genomsnitt 1 900 miljoner kronor per år under den redovisade perioden?",
        //         "correct_answer":{"$numberInt":"1"},
        //         "solution":""
        //     },
        //     {
        //         "answer_options":["2003","2005","2007","2009"],
        //         "difficulty":{"$numberDouble":"0.5"},
        //         "question":"Vilket av följande år såg storleksordningen för de olika miljöområdenas löpande kostnader ut enligt följande: \\n Luft < Vatten < Avfall < Övrigt?",
        //         "correct_answer":{"$numberInt":"1"},
        //         "solution":""
        //     },
        //     {
        //         "answer_options":["3","4","6","7"],
        //         "difficulty":{"$numberDouble":"0.5"},
        //         "question":"För hur många av de redovisade åren gäller att industrins miljöskyddsinvesteringar var mindre än 4 000 miljoner kronor samtidigt som de löpande kostnaderna för miljöskydd var större än 6 000 miljoner kronor?",
        //         "correct_answer":{"$numberInt":"1"},
        //         "solution":""
        //     }],
        //     "img_src": "https://www.studera.nu/contentassets/9e8b2ab7ea264b478e449758c712d2ac/image702bg.png?width=800"
        // },
        // {
        //     "sub_category":["Sannolikhet"],
        //     "exercise_id":"2020-10-25_5_2",
        //     "category":"XYZ",
        //     "questions":[{
        //         "answer_options":["x > 0","0 < x < 4","x > 1","1 < x < 5"],
        //         "difficulty":{"$numberDouble":"0.5"},
        //         "question":"I koordinatsystemet är grafen till funktionen f(x) inritad. För vilka värden på x är f(x) positiv?",
        //         "correct_answer":{"$numberInt":"1"},
        //         "solution":"Sannolikheten betecknas (Gynnsamma utfall)/(Möjliga utfall) \\n Antalet möjliga utfall är lika för Kvantitet I och Kvantitet II. \\n Men det finns enbart ett gynnsamt utfall för Kvantitet I: 1 (samtliga tärningar visar 5) \\n medan det för Kvantitet II finns fler (15=5+5+5=6+6+3).\n Kvantitet II måste därför vara större."
        //     }],
        //     "img_src": "https://www.studera.nu/contentassets/9e8b2ab7ea264b478e449758c712d2ac/image2x2er.png?width=800"
        // },
        {
            "sub_category":["Sannolikhet"],
            "exercise_id":"2020-10-25_3_14",
            "category":"KVA",
            "questions":[{
                "answer_options":["I är större än II","II är större än I","I är lika med II","informationen är otillräcklig"],
                "difficulty":{"$numberDouble":"0.5"},
                "question":"Tre vanliga sexsidiga tärningar kastas slumpmässigt en gång. \\n Kvantitet I: Sannolikheten att få tre femmor \\n Kvantitet II: Sannolikheten att summan av det tärningarna visar är 15",
                "correct_answer":{"$numberInt":"1"},
                "solution":"Sannolikheten betecknas (Gynnsamma utfall)/(Möjliga utfall) \\n Antalet möjliga utfall är lika för Kvantitet I och Kvantitet II. \\n Men det finns enbart ett gynnsamt utfall för Kvantitet I: 1 (samtliga tärningar visar 5) \\n medan det för Kvantitet II finns fler (15=5+5+5=6+6+3).\n Kvantitet II måste därför vara större."}]
        },
        {
        "sub_category":["Ekvationer","Prioriteringsregler"],
        "exercise_id":"2020-10-25_3_1",
        "category":"XYZ",
        "questions":[{
            "answer_options":["6","33","66","132/7"],
            "difficulty":0.5,
            "question":"Vilket värde har x om 5x + 66 = y/2 och y = 12x?",
            "correct_answer":2,
            "solution": "3/7 > 3/8 \n 3/7 + 5/8 > 3/8 + 5/8 = 1"
        }]
    }]);

    return (
        <div className="exercise-card">
            <section className="exercise-header">
                <h1>{exercises[0].category}</h1>
                {exercises[0].sub_category.map(sub_cat => <p>{sub_cat}</p>)}
                <p>{exercises[0].exercise_id.split('_')[0]}</p>
                <p>Provpass {exercises[0].exercise_id.split('_')[1]}</p>
                <p>Uppgift {exercises[0].exercise_id.split('_')[2]}</p>
            </section>
            {exercises[0].img_src !== undefined ? 
                <section className="exercise-figure">
                    <img src={exercises[0].img_src}/>
                </section> : <></>}
            {exercises[0].description !== undefined ?
                <section className="exercise-description">
                    <h3>{exercises[0].description.description_header}</h3>
                    {exercises[0]["description"]["description_body"].map(section => <p className="exercise-description-body">{section}</p>)}
                </section>
                : <></>
            }
            {exercises[0].questions.map((q, i) => <ExerciseQuestion question={q}/>)}
        </div>
    )
}

export default ExerciseCard;