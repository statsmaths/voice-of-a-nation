library(topicmodels)
library(cleanNLP)
library(stringi)
library(jsonlite)
library(readr)

cnlp_init_tokenizers()

anno <- cnlp_annotate(input=dir("../public/data/text", full.names=TRUE))
tokens <- cnlp_get_token(anno)
tokens$lemma <- stri_trans_tolower(tokens$word)
X <- cnlp_utils_tfidf(tokens, type="tf", tf_weight = "raw", min_df=0.05, max_df=0.5)
X <- as.matrix(X)

X <- X[,stri_length(colnames(X)) >= 3]
X <- X[,!stri_detect(colnames(X), regex="[0-9]")]
X <- X[,!stri_detect(colnames(X), fixed="\'")]

model <- LDA(X, k = 16, control = list(verbose = 1))

terms <- model@terms
beta <- model@beta
gamma <- model@gamma


meta <- read_csv("fwp_metadata_20190330.csv")
dindex <- as.numeric(stri_sub(dir("../public/data/text/"), 11, 14))
doc_names <- meta$title[dindex]
doc_names[is.na(doc_names)] <- sprintf("Interview %d", which(is.na(doc_names)))

these <- which(stri_length(doc_names) > 30)
doc_names[these] <- sprintf("%s...", stri_sub(doc_names[these], 1, 26))

all <- vector("list", nrow(beta))
top_words <- as.character(apply(get_terms(model, k=5), 2, paste, collapse=";"))
corp_topics <- apply(gamma, 2, sum)
corp_topics <- round(corp_topics / sum(corp_topics) * 100)
for (i in seq_len(nrow(beta))) {
  all[[i]] <- list(
    num=i,
    name=sprintf("Topic %d", i),
    description=sprintf("Topic %d: %s", i, top_words[i]),
    x=runif(1)*90,
    y=runif(1)*90,
    r=10,
    proportion=corp_topics[i]
  )
}

topics <- vector("list", nrow(beta))
for (i in seq_len(nrow(beta))) {
  top_docs_ids <- order(gamma[,i],decreasing=TRUE)[1:25]
  doc_perc <- gamma[top_docs_ids,i] * 100
  top_docs <- doc_names[top_docs_ids]

  top_word <- order(beta[i,],decreasing=TRUE)[1:25]
  word_wgt <- exp(beta[i,top_word])
  top_word <- terms[top_word]

  topics[[i]] <- list(
    num=i,
    top_docs_ids=top_docs_ids - 1L,
    top_docs=top_docs,
    doc_perc=doc_perc,
    top_word=top_word,
    word_wgt=word_wgt
  )
}

docs <- vector("list", nrow(gamma))
for (i in seq_len(nrow(gamma))) {
  top_topics_ids <- order(gamma[i,],decreasing=TRUE)
  top_topics <- sprintf("Topic %d", top_topics_ids)
  topic_weights <- round(gamma[i,top_topics_ids] * 100)

  num_include <- sum(topic_weights > 0)

  docs[[i]] <- list(
    num=i,
    doc=docs[i],
    top_topics_ids=top_topics_ids[seq_len(num_include)] - 1L,
    top_topics=top_topics[seq_len(num_include)],
    topic_weights=topic_weights[seq_len(num_include)]
  )
}


json <- list(
  all=all,
  topics=topics,
  docs=docs
)

write_json(json, "../public/data/topicdata.json")
