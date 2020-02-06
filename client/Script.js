function indirection(){
		var elem = document.getElementById("bob");
		if(elem.style.marginRight.localeCompare("") == 0){
			//nothing
		}else{
			sideBar("");
		}
	}

function sideBar(keyword){
	var sideBarWidth = 550;
			
  	var elem = document.getElementById("bob");
	var elem2 = document.getElementById("bob2");
			
 	var pos = 0;
			
	if( elem.style.marginRight.localeCompare('0px') == 0 || elem.style.marginRight.localeCompare("") == 0){
			
		var id = setInterval(frameLeave, 1);
		getLinks(keyword);
					
	}else{
		var id = setInterval(frameIn, 1);
	}
				
  	function frameLeave() {
				
		if (pos == sideBarWidth) {
     		clearInterval(id);
			lightBubble(document.getElementById("response"));
		} else {
      		pos += 2;
			elem.style.marginRight = pos + 'px';
			elem2.style.right = -550 + pos + 'px';
    	}
	}
			
	function frameIn(){
		dimBubble(document.getElementById('response'));
		if (pos == sideBarWidth) {
      		clearInterval(id);
			elem.style.marginRight = "";
			document.getElementById("bob3").innerHTML = '';
			noteTextarea.val('');
			noteContent = '';
    	} else {
      		pos += 2;
			elem.style.marginRight = (sideBarWidth) - pos + 'px';
			elem2.style.right = - pos + 'px';
    	}
	}			
}
	
window.addEventListener("click", function(event) {
		dimBubble(document.getElementById("intro"));
	});
	
function dimBubble(element){
		
	var op = 10;
		
	if (element.style.opacity.localeCompare('') == 0 || element.style.opacity.localeCompare('1') == 0){
		console.log("what");
		var id = setInterval(dimer, 50);
		
	}
		
		
	function dimer(){
		if (op == 0){
			clearInterval(id);
		}else{
			op -= 1;
			element.style.opacity = '0.' + op;
			console.log(op);
		}
	}
}
	
function lightBubble(element){
	var op = 0.0;
	
	if (element.style.opacity.localeCompare('') == 0 || element.style.opacity.localeCompare('0') == 0){
		console.log("what");
		var id = setInterval(dimer, 50);
	}

	function dimer(){
		if (op > 1){
			clearInterval(id);
			element.style.opacity = '1.0';
		}else{
			op += 0.1;
			element.style.opacity = ''+op;
			console.log(op);
		}
	}
}

function getLinks(keyword){
		
	if (keyword.localeCompare("PROBLEM_SELF_HARM") == 0) {
	
		showLinks(suicide);
				
	}else if (keyword.localeCompare("celebration") == 0){
			
		showLinks(roleModels2);
			
	}else if (keyword.localeCompare("PROBLEM_BULLY") ==0 ){
			
		showLinks(bullying);
				  
	}else if (keyword.localeCompare("PROBLEM_SEX")==0){
			
		showLinks(sexEd);
			
	}else if (keyword.localeCompare("PROBLEM_SCHOOL")==0){
			
		showLinks(tutorLinks);
				  
	}else if (keyword.localeCompare("PROBLEM_MENTAL")==0){
			
		showLinks(psychoLinks);
			
	}else{
			showLinks(roleModels2);
	}
}
	
function showLinks(linkPack){
		
	var offset = 500;
		
	var elem = document.getElementById("bob3");
		
	for(var i = 0; i<4 ; i++){
			
		var link = document.createElement("a");
		link.href = linkPack[10+i];

		link.className = "link";
		link.style.top = offset + "px";
		link.id = "link-"+(i+1);
		link.style.gridArea = 'link' + (i+1);
			
		var title = document.createElement("h2");
		title.style.marginBottom = "5px";
		title.innerHTML = linkPack[i];
			
		link.appendChild(title);
			
		var description = document.createElement("h4");
		description.style.marginTop = "5px";
		description.innerHTML = linkPack[20+i];
			
		link.appendChild(description);
			
		elem.appendChild(link);		
	}
		
	var l1 = document.getElementById("link-1");
	var l2 = document.getElementById("link-2");
	var l3 = document.getElementById("link-3");
	var l4 = document.getElementById("link-4");
	
	var pos1 = 0;
	var pos2 = 0;
	var pos3 = 0;
	var pos4 = 0;
	
	var rate = 4;

	var id1 = setInterval(enter1, 1);
	
			
	function enter1(){
		if (pos1 == offset){
			clearInterval(id1);
			var id2 = setInterval(enter2, 1);
		}else{
			pos1 += rate;
			l1.style.top = offset - pos1 + 'px';
		}
			
		function enter2(){
			if (pos2 == offset){
				clearInterval(id2);
				var id3 = setInterval(enter3, 1);
			}else{
				pos2 += rate;
				l2.style.top = offset - pos2 + 'px';
			}
			
			function enter3(){
				if (pos3 == offset){
					clearInterval(id3);
					var id4 = setInterval(enter4, 1);
				}else{
					pos3 += rate;
					l3.style.top = offset - pos3 + 'px';
				}
					
				function enter4(){
					if (pos4 == offset){
						clearInterval(id4);
					}else{
						pos4 += rate;
						l4.style.top = offset - pos4 + 'px';
					}
			
				}
			
			}
			
		}
			
	}
			
}

function sendSpeech() {
	
	var speech = document.getElementById("note-textarea").value;
	console.log(speech);
	
	var s = new WebSocket("ws://localhost:8000/");
	s.onopen = function(e) { s.send(speech);}
	s.onclose = function(e) {}
	s.onmessage = function(e) { 
		var keywords = e.data.split(" ");
		console.log(keywords[0]);
		console.log(keywords[1]);
				
		if(keywords[0].localeCompare("e")==0){	
			sideBar("nothing");
			emotional(" ", " ");
		}
		else if(keywords[1].localeCompare("joy") == 0){
			sideBar("celebration");
			emotional(keywords[1], keywords[0]);
		}
		else{
			sideBar(keywords[0]);
			emotional(keywords[1], keywords[0]);
		}	
	};
}

function emotional(feeling, problem){
		
	var response = document.getElementById("response");
	response.innerHTML='';
	var small = document.createElement("p");
	var small2 = document.createElement("p");
	var big = document.createElement("h1");
	var smallText;
	var smallText2;
	var bigText;
		
	if (feeling.localeCompare("sadness") == 0){
		bigText = "I'm sorry to hear that";
		smallText = "Here are some links that could help you out";
	}else if(feeling.localeCompare("joy") == 0){
		bigText = "Great to hear!";
		smallText = "I'm happy for you!";
	}else if(feeling.localeCompare("anger") == 0){
		bigText = "It must be hard.";
		smallText = "Here are some websites that might help!";
	}else if(feeling.localeCompare("disgust")== 0){
		bigText = "I hear you.";
		smallText = "Take a look at these ";
	}else if(feeling.localeCompare("fear") == 0){
		bigText = "Stay strong, hang in there!";	
		smallText = "Take a look at these suggestions. ";
	}else{
		bigText = "Hmm, let me think...";	
		smallText = "Take a look at some of these resources";
	}
		
	if (problem.localeCompare("PROBLEM_SELF_HARM") == 0) {
		smallText2 = "Dont beat yourself up";
	}else if (problem.localeCompare("celebration") == 0){
		smallText2 = "Take these with you, it can't hurt!";
	}else if (problem.localeCompare("PROBLEM_BULLY") ==0 ){
		smallText2 = "You should get some help.";
	}else if (problem.localeCompare("PROBLEM_SEX")==0){
		smallText2 = "Dont be ashamed. It's natural.";
	}else if (problem.localeCompare("PROBLEM_SCHOOL")==0){
		smallText2 = "Theres nothing wrong with seeking some extra help";
	}else if (problem.localeCompare("PROBLEM_MENTAL")==0){
		smallText2 = "Don't be afraid to reach out.";
	}else{
		smallText2 = "You could try to talk to me again or try these ressources that could be of better use to you. Hope it helps!";
	}
	small.innerHTML = smallText;
	small2.innerHTML = smallText2;
	big.innerHTML = bigText;
	response.appendChild(big);
	response.appendChild(small2);
	response.appendChild(small);
}

//due to time constraints, link data is hardcoded.

var sexEd = new Array();
var tutorLinks = new Array();
var psychoLinks = new Array();
var bullying = new Array();
var suicide = new Array();
var roleModels = new Array();
var roleModels2 = new Array();
		
sexEd[0] = "Sexuality Education Resource Centre";
sexEd[1] = "Society for Adolescent Health and Medicine";
sexEd[2] = "The Healthy Sex Talk: Teaching Kids Consent";
sexEd[3] = "Sex Ed Rescue";
	
sexEd[10] = "https://serc.mb.ca/";
sexEd[11] = "https://www.adolescenthealth.org/Resources/Clinical-Care-Resources/Sexual-Reproductive-Health/Sexual-Reproductive-Health-Resources-For-Adolesc.aspx";
sexEd[12] = "https://goodmenproject.com/families/the-healthy-sex-talk-teaching-kids-consent-ages-1-21/";
sexEd[13] = "https://sexedrescue.com/sex-education-resources/";
	
sexEd[20] = "Sexuality Education Resource Centre provides inclusive, non-judgmental education about sexuality. We believe that people have the right to accurate information on all their choices.";
sexEd[21] = "The Sexual and Reproductive Health Resources for Adolescents and Young Adults are online resources aimed specifically at people like you. ";
sexEd[22] = "Resources wrote by writers, educators, and advocates of sex-positivity and healthy consent. This online guide is meant to teach you about the fundamentals of a healthy sexual life";
sexEd[23] = "A compilation of online resources about sexual education. This will help you make the right decisions about love, sex and relationships. As well as strengthen your relationship without feeling embarrassed, awkward or nervous.";
		
tutorLinks[0] = "Khan Academy";
tutorLinks[1] = "Smart Tutor";
tutorLinks[2] = "TutorsClass";
tutorLinks[3] = "Take Lessons";
	
tutorLinks[10] = "https://www.khanacademy.org/";
tutorLinks[11] = "http://freeresources.smarttutor.com/";
tutorLinks[12] = "http://www.tutorsclass.com/";
tutorLinks[13] = "https://takelessons.com/blog/academics";
	
tutorLinks[20] = "Khan Academy is one of the biggest names in online learning and is completely free.";
tutorLinks[21] = "SmartTutor produces lots of free educational games, reading lessons and flashcards to help with lesson retention.";
tutorLinks[22] = "TutorsClass is an online tutoring platform that allows tutors to work with their students in an online classroom.";
tutorLinks[23] = "TakeLessons offers free resources and articles for students looking to improve in subjects such as math or history.";
	
bullying[0] = "Bullying Canada";
bullying[1] = "National Bullying Prevention Center";
bullying[2] = "OSSTF";
bullying[3] = "Stop A Bully";
	
bullying[10] = "https://www.bullyingcanada.ca/";
bullying[11] = "https://www.pacer.org/bullying/resources/ ";
bullying[12] = "https://www.osstf.on.ca/en-CA/publications/research-studies/bullying/canadian-bullying-resources-online.aspx";
bullying[13] = "http://www.stopabully.ca/teacher-resources.html";
	
bullying[20] = "National organization that helps resolve bullying situations.";
bullying[21] = "Helping you with any bullying or cyber-bullying issues.";
bullying[22] = "Their goal is to ensure that all members have safe and healthy workplaces and that students have a safe and healthy learning environment.";
bullying[23] = " A registered national charity and Canada-wide anti-bullying program that is both free to use and anonymous.";
	
suicide[0] = "Suicide Prevention Resource Center";
suicide[1] = "Crisis Services Canada";
suicide[2] = "Youth.gov";
suicide[3] = "Mental Health Services Administration";
	
suicide[10] = "https://www.sprc.org/settings/schools";
suicide[11] = "https://www.crisisservicescanada.ca/en/";
suicide[12] = "https://youth.gov/youth-topics/youth-suicide-prevention";
suicide[13] = "https://www.samhsa.gov/safe-schools-healthy-students/resources/suicide-prevention ";
	
suicide[20] = "Uses a comprehensive approach to help you in your most vulnerable moments.";
suicide[21] = "We are available by text or call to help you during these difficult times.";
suicide[22] = "Helping you get through your moments of distress. We can help!";
suicide[23] = "Learn how to prevent suicide and promote behavioral health.";
	
psychoLinks[0] = "Canadian Psychological Association";
psychoLinks[1] = "Children’s Mental Health Ontario";
psychoLinks[2] = "Student Life UoT Resource";
psychoLinks[3] = "Accredited Online School";
	
psychoLinks[10] = "https://cpa.ca/students/resources/";
psychoLinks[11] = "https://www.cmho.org/education-resources/teacher-resources";
psychoLinks[12] = "https://www.studentlife.utoronto.ca/feeling-distressed";
psychoLinks[13] = "https://www.accreditedschoolsonline.org/resources/student-mental-health-resources/ ";
	
psychoLinks[20] = "Provides valuable resources regarding mental health.";
psychoLinks[21] = "Tips on early identification and intervention of common mental health issues.";
psychoLinks[22] = " If you are in distress, we can connect you to the help you need.";
psychoLinks[23] = "Expert advice and school resources for understanding disorders and getting help.";
	
roleModels[0] = "CON";
roleModels[1] = "GRA";
roleModels[2] = "TU";
roleModels[3] = "LAaaATIONS";
	
roleModels[10] = "www.google.com";
roleModels[11] = "www.google.com";
roleModels[12] = "www.google.com";
roleModels[13] = "www.google.com";

roleModels[20] = "desc";
roleModels[21] = "desc";
roleModels[22] = "desc";
roleModels[23] = "desc";
	
roleModels2[0] = "Friend Quebec";
roleModels2[1] = "ACTRA Montreal";
roleModels2[2] = "First Hand Canada";
roleModels2[3] = "Yes Montreal";
	
roleModels2[10] = "https://amiquebec.org/";
roleModels2[11] = "http://www.actramontreal.ca/mental-health-resources/";
roleModels2[12] = "https://www.cbc.ca/firsthand/m_features/mental-health-resources-for-canadians";
roleModels2[13] = "https://www.yesmontreal.ca/en/job_seekers/resources/community_links";
	
roleModels2[20] = "AMI-Quebec is a non-profit organization that helps you manage the effects of mental illness through support, education and guidance.";
roleModels2[21] = "They provide counselling or other health services, including crisis support. You can reach out to them for free.";
roleModels2[22] = "A list of mental health resources to help during your most difficult times.";
roleModels2[23] = "Your mental health matters, Yes Montreal offers many services to support you such as 24/7 hotlines.";