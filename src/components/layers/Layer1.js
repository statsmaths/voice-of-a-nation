import React from 'react';

import Collapsible from 'react-collapsible';

function Layer1(props) {

    return(
<div className="text-holder">
  <h1 style={{paddingTop: "0px"}}> Introduction </h1>
<p>Here is a fact. <sup className="tooltip">[2]<span>And somethings and other things and many many many many other things too.</span></sup></p>
<p>“The people, all the people, must be known, they must be heard,” proclaimed William T. Couch in 1939 from Chapel Hill. A respected editor turned part-time government bureaucrat, Couch served as both director of the University of North Carolina Press and the New Deal’s Federal Writers' Project (FWP) Southern Life History Project.<sup><a href="#ref1" id="fnref1">[1]</a></sup> As economic turmoil engulfed the nation, his concern for the voiceless led to the development of a new form of documentary expression called a “life history,” oral interviews of everyday people’s life experiences captured in writing by federal workers. Alongside cultural workers across the United States such as James Agee and Walker Evans, he shared a belief in the power of documentary expression to render visible silenced communities and to challenge depictions of southern life as antiquated, depraved, and languid. “Somehow they must be given representation,” he continued, “somehow they must be given voice and allowed to speak, in their essential character.”<sup><a href="#ref2" id="fnref2">[2]</a></sup> If they could speak, he reasoned, these communities could help communicate what they needed to end the Great Depression and in the process reshape how the nation understood the region and its place in American society.</p>
<p>With the support of the New Deal, Couch led a laudatory experiment in social documentary driven by a deep passion and concern for the past, present, and future of the South. Couch’s desire to circulate working-class voices grew out of his distress over how intellectuals from academia, such as acclaimed sociologist Howard Odum, and literature, such as author Erskine Caldwell, portrayed the region. While the former reduced people to nameless statistics, the latter depicted the region as backwards, a theme federal bureaucrats drew on to argue that the region could not modernize and move out of the Great Depression. Couch believed that his new method of social documentation—conducting oral histories that were recorded only in writing—would provide a mechanism to understand the challenges of the American South as articulated by those actually grappling with the effects of industrialization and systems of economic and racial inequality. How best to capture, document, and analyze the words of the people was a contested project that placed Couch, Chapel Hill, and the New Deal at the center of debates over what counted as knowledge in the humanities and social sciences.</p>

<Collapsible trigger="Section Name">
  <p>These debates shaped Couch’s tenure as Director of Southeast Region of the Federal Writers’ Project and were the impetus behind his creation of the Southern Life Histories Project (SLHP). The SLHP was dedicated to capturing the stories of everyday Americans, especially those who had been previously marginalized from historical accounts, including African Americans, women, and working-class white men. The SLHP together with other regional units of the FWP produced nearly 10,000 interviews nationwide, constituting one of the nation's large first-person narrative collections. However, nearly 80 years later, few have ever heard of Couch’s groundbreaking project or the significant effect it had on shaping ideas of what counted as social documentation, collective memory, and regional identity.</p>
  <p><em>Voice of a Nation: Mapping Documentary Expression in New Deal America</em> recovers the history of the Southern Life History Project (SLHP) through an interdisciplinary approach that combines close readings of archival material with computational methods that analyze the collection at scale. The project centers addresses six questions: what were the motivating factors behind the creation of the SLHP? How did the SLHP come into formation? Who was represented in the life histories? Why were they represented? How were they represented, and what are the legacies of the SLHP? The answers to these questions demonstrate key points in this struggle over what counted as social knowledge, how to accurately represent social conditions, who could produce such knowledge, and who is and is not represented.</p>
  <p>Here is a fact. <sup className="tooltip">[2]<span>And somethings and other things and many many many many other things too.</span></sup> concerning how to document social conditions most accurately - including what gets counted as objective evidence, who are legitimate researchers, and how findings should be written - dominated debates in the 1920s and 1930s. The stakes heightened with the onset of the Great Depression as intellectuals moved between the academy and New Deal state to identify and develop solutions. Concerns that the methods and output of social science research obscure the voices of the people being studied animated debates in the 1920s and 1930s when the social sciences were forging and institutionalizing their methodological toolkit. Such debates were also not limited to the northeast or in Chicago as some accounts argue, but deliberated by universities in the South, particularly at the University of North Carolina-Chapel Hill, which were in the process of transforming into research institutions. While the form of life histories were dismissed as too qualitative by scholars like Howard Odum, the writers’ education, gender and familiarity with the communities that they were documenting contributed to positioning these life histories as stories rather than scholarly evidence. As a result, the life histories would not garner a reputation as authentic, scholarly knowledge from academia in the 1930s but become a foundation of the oral history two decades later.</p>
</Collapsible>

<Collapsible trigger="Section Name 2">
  <p>As debates ensued over the methods, the FWP forged ahead with life histories creating over 1,200 interviews for the Southern Life History Project. By revealing that the SLHP focused on groups such as factory workers, mill workers, and tenant farmers in rural towns, we argue that the SLHP positioned southern laborers as perceptive about their conditions, hard working, and shaped by the past as well as the present rather than replicating stereotypes about the region as uneducated, lazy, and backwards. In the process, the audience for the life histories comes into focus. By centering the hardships of the white working class through first person narrative stories that emphasized the emotional realities of the everyday experience, the white working class became the voices of the South for middle and upper class white readers primarily residing on the east coast. At the same time that these stories complicated earlier narratives, they simultaneously erased the brutality of segregation and the effects of slavery by omitting stories that addressed such important issues, thereby reifying cultural and structural racism.</p>
  <p><em>Voice of a Nation</em> is organized into layers that can be read independently or together. Layer 1-2 uncovers the history of the SLHP by centering Chapel Hill in debates over sociological knowledge production and how to define the South during the early 1900s. Specifically, Layer 2 recovers the history of the SLHP and why the project offered a new method called life histories for documenting social conditions. Through visual and textual forms of argument, Layer 3 turns to the politics of representation in the SLHP by combining spatial and textual analysis with archival research. After visualizing the geographical reach of the SLHP in Layer 3, we turn to the how the subjectivities of the interviewees and interviewers shaped who, why and how people were represented in Layer 4. The Conclusion draws on all four layers to reveal how the SLHP centered the white working class as the voice of the South.</p>
  <p>In aggregate, the project demonstrates an entangled story about how the life histories as a new form of documentary evidence concerned with capturing authenticity contested existing approaches to producing sociological knowledge and public memory; the role that gender, class, and race played in negotiating these new methods; and, how this genre of social documentary helped to shape notions of what it meant to be an American and a Southerner during a time of political, social and economic unrest. While we address these themes, there are many exciting directions to take to understand these SLHP, which you can see by moving through exploratory interfaces or by analyzing the <em>List Histories Data Set</em>. We invite you to pose and answer questions of your own. We hope that by moving through this digital text, you see how our argument unfolds in new ways made possible by combining innovations in methods with new affordances of the digital medium.</p>
</Collapsible>

</div>
    )
}


export {Layer1};