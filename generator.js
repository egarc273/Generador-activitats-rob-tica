// Aquest objecte 'activityGenerator' conté tota la lògica i plantilles
// per crear les propostes d'activitats.
const activityGenerator = {
    generate(userInput) {
        // Aquesta és la funció principal que construeix l'activitat.
        // A la pràctica, tindria una lògica més complexa per combinar
        // diferents fragments de text segons les respostes de l'usuari.

        // Per a aquest exemple, retornem una plantilla completa
        // personalitzada amb les dades de l'usuari.
        
        const { level, subject, concept, material, duration } = userInput;

        // Aquí podríem tenir funcions que trien el text adequat
        // segons el nivell, la matèria, etc.
        // getIntroduction(level, subject)
        // getChallenge(concept, material)
        // getEvaluation(level)

        return `
            <h2>Proposta d'Activitat: ${concept} a ${subject}</h2>
            <p><strong>Nivell:</strong> ${level} | <strong>Durada estimada:</strong> ${duration}</p>
            
            <h3>a) Introducció</h3>
            <p>Aquesta activitat connecta l'àrea de <strong>${subject}</strong> amb el pensament computacional. Es treballaran habilitats clau com la <strong>descomposició</strong> (dividir el repte en parts petites), el <strong>reconeixement de patrons</strong> (identificar repeticions), l'<strong>abstracció</strong> (centrar-se en l'essencial) i el <strong>disseny d'algorismes</strong> (crear instruccions pas a pas). Aquestes competències estan alineades amb les àrees transversals del Decret 175/2022 d'ordenació dels ensenyaments de l'educació bàsica.</p>

            <h3>b) Descripció del Desafiament</h3>
            <p><strong>Repte:</strong> Dissenyar i programar un sistema amb <strong>${material}</strong> que representi el concepte de <em>"${concept}"</em>. Els estudiants hauran de:
                <ul>
                    <li><strong>Descompondre:</strong> Quines parts té el nostre sistema? (Ex: una part que mesura, una que actua, una que mostra informació).</li>
                    <li><strong>Identificar patrons:</strong> Hi ha accions que es repeteixen? Podem crear una funció o un bucle?</li>
                    <li><strong>Abstraure:</strong> Quina és la informació clau que necessitem? Ignorem els detalls visuals que no són importants per al funcionament.</li>
                    <li><strong>Dissenyar un algorisme:</strong> Escriure en un pseudocodi o diagrama de flux els passos que el robot/programa ha de seguir abans de començar a programar.</li>
                </ul>
            </p>

            <h3>c) Activitats Pràctiques</h3>
            
            <h4>Activitat Desendollada: El Mapa del Tresor</h4>
            <div class="unplugged-activity">
                <p><strong>Material:</strong> Paper quadriculat, retoladors, fitxes (o taps d'ampolla).</p>
                <p>En grups, un estudiant dibuixa un mapa amb un inici, un final (el tresor) i alguns obstacles. La resta de l'equip ha de crear una seqüència d'instruccions (endavant, gira dreta, gira esquerra) per guiar una fitxa des de l'inici fins al tresor. Això practica la creació d'algorismes de manera manipulable.</p>
            </div>

            <h4>Activitat amb ${material}</h4>
            <p>Utilitzant el material <strong>${material}</strong>, els estudiants implementaran l'algorisme dissenyat prèviament. Aquí teniu un exemple de codi de blocs per començar:</p>
            <div class="code-example">
                <p>// (Aquí s'inclouria una imatge de l'exemple de codi per al material seleccionat)</p>
                <p><strong>Exemple per a micro:bit (MakeCode):</strong></p>
                <pre>
al iniciar:
  mostra icona(Cor)

al presionar botó A:
  mostra número(5)
                </pre>
            </div>
            
            <h3>e) Reflexió i Avaluació</h3>
            <p>Un cop finalitzat el repte, plantegeu aquestes preguntes en grup:</p>
            <ul>
                <li>Quin ha estat el pas més difícil? Per què?</li>
                <li>Si haguéssiu de tornar a començar, què faríeu diferent?</li>
                <li>Com heu utilitzat la descomposició per resoldre el problema?</li>
            </ul>
            <h4>Rúbrica d'Avaluació (Exemple simplificat)</h4>
            <p>Basada en els criteris d'avaluació del currículum:</p>
            <p><strong>CE 3.1:</strong> Identifica i descompon problemes simples. (Assoliment: Alt / Mitjà / Baix)</p>
            <p><strong>CE 3.2:</strong> Crea seqüències d'instruccions (algorismes) per resoldre una tasca. (Assoliment: Alt / Mitjà / Baix)</p>

            <h3>f) Connexió amb el Món Real</h3>
            <p>Les habilitats que heu practicat avui són les mateixes que utilitzen els enginyers de software per crear aplicacions com TikTok, els científics per analitzar grans quantitats de dades o els arquitectes per dissenyar edificis. Entendre com donar instruccions precises a una màquina és fonamental en gairebé totes les professions del futur.</p>
        `;
    }
};
