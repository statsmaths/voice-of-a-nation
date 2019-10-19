import React from 'react';

function Layer5(props) {

    return(
<div>
  <h1 style={{paddingTop: "0px"}}> Layer 4: Textual Analysis </h1>

  <p>
The fourth and final layer builds on location and identity data by analyzing how the people and places were represented in the life histories. The layer brings together the metadata analysis with text analysis of the entire SLHP archive. The layer contains two major sections. The first uses topic modeling paired with metadata analysis and close reading to interrogate key themes discussed throughout the life histories; the second focuses on the impact of writing styles and rhetorical structures on representational practices.
  </p>

  <p>
Through topic modeling of the corpus of all life histories, a number of important themes emerge to reveal central insights about notions of work, cultural memory, domestic life, education, and health concerns. Like Layer 3, this layer is designed to be interactive and exploratory, allowing audiences to move between topic models and the interviews themselves. For example, a reader-user can select a theme such as “tenant farming” and “mill workers” to see which interviews conducted by which interviewers and where are connected to the same theme. The reader then will be able to click through to the interview and explore the topic as discussed in the life history. They will also see which other topics the interview is associated with offering other themes to explore.
  </p>

  <p>
At the same time, the textual argument articulates the significance of each topic cluster for understanding themes that run throughout the corpus. For instance, one set of topics demonstrate key themes relating to the relationship between national identity and memory that are centrally important to social history. Topics such as the Civil War and slavery emerged. The weight of these topics demonstrate a major impulse behind the documentary project—to record important memories relating to national history before they disappeared as those who had lived through the Civil War and slavery were dying of old age. Another set of topics reveal the life histories significant focus on economics and labor and how the kinds of labor such as tenant farming and mill work reflected major concerns of the New Deal state.
  </p>

  <p>
The life histories have been variously classified as first-person narratives,<sup><a href="#ref1" id="fnref1">[1]</a></sup> conversational narratives,<sup><a href="#ref2" id="fnref2">[2]</a></sup> and modeled after travel literature and ethnography.<sup><a href="#ref3" id="fnref3">[3]</a></sup> Through computational text analysis, we measure the frequency of certain rhetorical devices and compare them with demographic information relating to interviewees and interviewers to reveal the ways in which specific rhetorical conventions were used to signify authenticity, most prominently through the representation of racial difference. For example, our analysis reveals information relating to the relationship between race and dialect. Because the Federal Writers’ Project wanted to portray the life histories as realistic to their perceived audience (white, book readers), they created rules around documenting speech patterns through writing practices, which included written dialect. Many scholars have noted that while this rule should have been employed for all interviewees, it was mostly applied to African Americans, which is why Toni Morrison calls this speech “eye dialect.” She argues that this writing practice “‘relies on phonetic spellings and apostrophes to make visible to the eye sounds that cannot be heard in the medium of print,’” thereby rendering “‘the speech of black characters ‘as an alien, estranging dialect made deliberately unintelligible by spellings contrived to defamiliarize it.’”<sup><a href="#ref4" id="fnref4">[4]</a></sup>
  </p>

  <p>
While scholars have noticed this perceived pattern of using such dialect with African American stories, there has never been a systematic analysis of the entire corpus. Catherine Stewart explains, “scholars have yet to examine how white FWP interviewers chose to hear black speech and black testimony and how, as the transcribers of these stories, they interpreted and represented the black vernacular and the tales themselves.”<sup><a href="#ref5" id="fnref5">[5]</a></sup> Through our approach, we are able to complete such an examination, and have demonstrated that written dialect was used in approximately 85% of African American interviewees as compared to 45% of white interviewees. Such data can then be further parsed by gender, geographical origin, and topics discussed, thus shedding light on how rhetorical conventions and identity representation mixed to inform the development of social realism as a documentary genre. Just as in section 1, reader-users will be able to move between the data visualizations together with the corresponding textual arguments. Most provocatively, we suggest that these different and at times conflicting writing styles demonstrate how the positionality of writers affected the content. We argue that the ways in which the life histories revealed the subjective nature of the documentary process is likely what led the new approach of documentation to be seen as ameutrish and not fit to be included as an academic method in the eyes of other scholars such as Howard Odum. The interviews could not be considered objective evidence necessary for the professionalization of disciplines seeking to position themselves within the evolving rhetoric of scientific discourse.
  </p>

  <h3>References</h3>

  <p id="ref1">[1] Banks, Rapport, and Federal Writers’ Project, <em>First-Person America</em>. <a href="#fnref1">↩</a></p>
  <p id="ref2">[2] Jerrold Hirsch, <em>Portrait of America: A Cultural History of the Federal Writers’ Project: A Cultural History of the Federal Writers’ Project</em> (Univ of North Carolina Press, 2003) <a href="#fnref2">↩</a></p>
  <p id="ref3">[3] Stewart, <em>Long Past Slavery</em> <a href="#fnref3">↩</a></p>
  <p id="ref4">[4] Stewart, 79. <a href="#fnref4">↩</a></p>
  <p id="ref5">[5] Stewart, 5–6. <a href="#fnref5">↩</a></p>

</div>
    )
}


export {Layer5};
