let currentScene = 0;

const scenes = [
    {id:0, bg:'https://picsum.photos/id/1015/1920/1080', char:'', dialogue:"Sa isang ordinaryong paaralan sa Maynila noong 2015, nabubuhay si Matt Rivera — isang tahimik, responsable, at seryosong binata na mahilig sa musika at pag-aaral.", speaker:"Narrator", choices:[{text:"Magpatuloy", next:1}]},
    {id:1, bg:'https://picsum.photos/id/1015/1920/1080', char:'', dialogue:"Isang umaga, habang nagmamadali sa hallway, nabangga niya si Milca Santos, isang maganda, mabait, at masiglang dalaga na kilala sa kanyang talino.", speaker:"Narrator", choices:[{text:"Tulungan siya", next:2}]},
    {id:2, bg:'https://picsum.photos/id/1015/1920/1080', char:'', dialogue:"'Pasensya na po. Hindi ko sinasadya,' sabi ni Matt habang tinutulungan siyang tumayo. Ngumiti si Milca at mula noon ay nagsimulang magbago ang lahat.", speaker:"Milca", choices:[{text:"Magpatuloy", next:3}]},
    
    // Long development
    {id:3, bg:'https://picsum.photos/id/866/1920/1080', char:'', dialogue:"Sa mga susunod na linggo, naging magkaibigan sila. Nag-aaral sila nang magkasama sa paaralan at nagbabahagi ng mga kwento tungkol sa buhay.", speaker:"Narrator", choices:[{text:"Magpatuloy", next:4}]},
    {id:4, bg:'https://picsum.photos/id/866/1920/1080', char:'', dialogue:"Sa bahay ni Matt, binisita siya ni Milca. Nag-usap sila nang matagal tungkol sa kanilang mga pangarap at takot sa hinaharap.", speaker:"Milca", choices:[{text:"Magpatuloy", next:5}]},
    {id:5, bg:'https://picsum.photos/id/1016/1920/1080', char:'', dialogue:"Sa gym, nag-ehersisyo sila nang magkasama. Unti-unti, natutunan ni Matt kung gaano kahalaga si Milca sa kanyang buhay.", speaker:"Matt", choices:[{text:"Magpatuloy", next:6}]},
    
    {id:6, bg:'https://picsum.photos/id/870/1920/1080', char:'', dialogue:"Sa Jollibee, kanilang paboritong lugar para mag-date, nag-enjoy sila sa simpleng pagkain at tawanan. Dito nila unang sinabi ang kanilang nararamdaman.", speaker:"Narrator", choices:[{text:"Magpatuloy", next:7}]},
    {id:7, bg:'https://picsum.photos/id/870/1920/1080', char:'', dialogue:"'Milca, ikaw ang nagbigay ng liwanag sa aking buhay,' sabi ni Matt nang may buong katapatan.", speaker:"Matt", choices:[{text:"Magpatuloy", next:8}]},
    
    // More scenes for length (repeated visits + emotions)
    {id:8, bg:'https://picsum.photos/id/1015/1920/1080', char:'', dialogue:"Sa paaralan, naghanda sila para sa isang importanteng proyekto. Ang kanilang pagsasama ay lalong lumalim.", speaker:"Narrator", choices:[{text:"Magpatuloy", next:9}]},
    {id:9, bg:'https://picsum.photos/id/1016/1920/1080', char:'', dialogue:"Sa gym, habang nagpapahinga, ibinahagi ni Milca ang kanyang mga pangarap sa hinaharap kasama si Matt.", speaker:"Milca", choices:[{text:"Magpatuloy", next:10}]},
    {id:10, bg:'https://picsum.photos/id/870/1920/1080', char:'', dialogue:"Paulit-ulit silang nag-date sa Jollibee. Ang bawat sandali ay nagiging alaala na ayaw nilang kalimutan.", speaker:"Narrator", choices:[{text:"Magpatuloy", next:11}]},
    {id:11, bg:'https://picsum.photos/id/866/1920/1080', char:'', dialogue:"Sa bahay, pinag-isipan ni Matt ang tungkol sa kanilang kinabukasan. Desisyon na ang kailangan.", speaker:"Matt", choices:[{text:"Magpatuloy", next:12}]},
    
    // Branch
    {id:12, bg:'https://picsum.photos/id/870/1920/1080', char:'', dialogue:"Ngayon, kailangan mong pumili. Ano ang mangyayari sa kwento nina Matt at Milca?", speaker:"Narrator", choices:[
        {text:"Ituloy ang pag-ibig at ikasal sila (Happy Ending)", next:20},
        {text:"Mag-antala at harapin ang trahedya (Sad Ending)", next:15}
    ]},
    
    // Sad Ending
    {id:15, bg:'https://picsum.photos/id/201/1920/1080', char:'', dialogue:"Pagkatapos ng masayang gabi sa Jollibee, habang naglalakad pauwi si Milca, biglang lumabas ang isang truck at siya ay nasagasaan. Si Matt ay dumating na puno ng sakit at pagsisisi na hindi na niya mababawi.", speaker:"Narrator", choices:[{text:"Sad Ending", ending:'sad'}]},
    
    // Happy Ending with beautiful sunset
    {id:20, bg:'https://picsum.photos/id/1018/1920/1080', char:'', dialogue:"Matapos ang lahat ng pagsubok sa paaralan, bahay, gym, at Jollibee, nag-propose si Matt. Sa tabi ng dagat, sa ilalim ng napakagandang sunset na may mainit na orange at gintong liwanag, ikinasal sila. Isang walang-hanggang simula.", speaker:"Narrator", choices:[{text:"Happy Ending", ending:'happy'}]}
];

function updateScene() {
    const scene = scenes.find(s => s.id === currentScene);
    if (!scene) return;
    document.getElementById('background').style.backgroundImage = `url('${scene.bg}')`;
    const char = document.getElementById('character');
    char.src = scene.char || '';
    char.style.display = scene.char ? 'block' : 'none';
    document.getElementById('dialogue-box').innerHTML = `<strong>${scene.speaker}:</strong><br>${scene.dialogue}`;
    
    const choicesDiv = document.getElementById('choices');
    choicesDiv.innerHTML = '';
    scene.choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.textContent = choice.text;
        btn.onclick = () => choice.next !== undefined ? (currentScene = choice.next, updateScene()) : showEnding(choice.ending);
        choicesDiv.appendChild(btn);
    });
}

function startGame() {
    document.getElementById('title-screen').style.display = 'none';
    currentScene = 0;
    updateScene();
}

function showEnding(type) {
    const div = document.createElement('div');
    div.style.cssText = `position:absolute;top:0;left:0;width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:40;color:#fff;text-align:center;background:${type==='sad'?'rgba(20,0,0,0.95)':'linear-gradient(#ff9900,#cc3300)'};`;
    div.innerHTML = type === 'sad' 
        ? `<h1 style="color:#ff5555;">UNTIL THE END - Sad Ending</h1><p>Namatay si Milca matapos masagasaan ng truck. Si Matt ay nanatiling wasak at puno ng pagsisisi.</p>` 
        : `<h1 style="color:#ffff00;">UNTIL THE END - Happy Ending</h1><p>Ikakasal sina Matt at Milca sa tabi ng dagat sa ilalim ng magandang sunset. Isang walang hanggang pag-ibig.</p>`;
    div.innerHTML += `<button onclick="location.reload()" style="margin-top:40px;padding:20px 50px;font-size:1.4em;">Muling Simulan</button>`;
    document.getElementById('game-container').appendChild(div);
}
