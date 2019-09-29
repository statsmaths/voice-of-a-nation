library(readr)
library(stringi)
library(dplyr)

z <- read_csv("fwp_metadata_20190330.csv")

title <- stri_replace_all(z$title, "'", fixed="\"")
title[is.na(title)] <- ""

interviewer <- sprintf("%s; %s; %s", z$interviewer_1, z$interviewer_2, z$interviewer_3)
interviewer <- stri_replace_all(interviewer, "", fixed="; NA")
interviewer <- stri_replace_all(interviewer, "'", fixed="\"")
interviewer[interviewer == "NA"] <- ""

reviser <- sprintf("%s; %s; %s", z$reviser_1, z$reviser_2, z$reviser_3)
reviser <- stri_replace_all(reviser, "", fixed="; NA")
reviser <- stri_replace_all(reviser, "'", fixed="\"")
reviser[reviser == "NA"] <- ""

interviewee <- sprintf("%s; %s", z$interviewee_1, z$interviewee_2)
interviewee <- stri_replace_all(interviewee, "", fixed="; NA")
interviewee <- stri_replace_all(interviewee, "'", fixed="\"")
interviewee[interviewee == "NA"] <- ""

day_interview <- as.numeric(z$day_interview)
date <- sprintf("%02d %s %04d", day_interview, month.name[z$month_interview], z$year_interview)
date <- stri_replace_all(date, "", fixed="NA ")
date[date == "00NA"] <- ""

county <- sprintf("%s County", z$county)
county[which(z$state == "Louisiana")] <- sprintf("%s Parish", z$county[which(z$state == "Louisiana")])
location <- sprintf("%s, %s, %s, %s, %s", z$street_address, z$community, z$city, z$county, z$state)
location <- stri_replace_all(location, "", fixed="NA, ")
location <- stri_trans_totitle(location)
location[location == "Na"] <- ""

gender <- stri_trans_totitle(z$gender_interviewee_1)
gender[is.na(gender)] <- ""

race <- stri_trans_totitle(z$race_interviewee_1)
race[is.na(race)] <- ""

occupation <- sprintf("%s; %s", z$occupation_1, z$occupation_2)
occupation <- stri_replace_all(occupation, "", fixed="; NA")
occupation[occupation == "NA"] <- ""


df <- tibble(id = seq_len(nrow(z)), filename=z$file_name,
             title, interviewer, reviser, interviewee, date, location,
             gender, race, occupation, lat=NA, lon=NA)

x <- read_csv("fwp_small_upload.csv")
index <- match(df$filename, x$filename)
df$lat[!is.na(index)] <- x$lat[index[!is.na(index)]]
df$lon[!is.na(index)] <- x$lon[index[!is.na(index)]]

###############################################################################
x <- df
x <- x[!is.na(x$lat) & !is.na(x$lon),]

x$gender_col <- "black"
x$gender_col[x$gender == "Female"] <- "red"
x$gender_col[x$gender == "Male"] <- "blue"

x$race_col <- "black"
x$race_col[x$race == "Black"] <- "pink"
x$race_col[x$race == "White"] <- "green"

json <- sprintf('{"lat": %f, "lon": %f, "title": "%s", "interviewer": "%s", "gender": "%s", "race": "%s", "id": %d}',
                x$lat, x$lon, x$title, x$interviewer, x$gender_col, x$race_col, x$id)

txt <- sprintf("[%s]", paste(json, collapse=","))

writeLines(txt, "../public/data/geodata.json")

###############################################################################

for (i in seq_len(nrow(df)))
{
  json <- paste(sprintf('"%s": "%s"', names(df), matrix(df[i,])), collapse=",")
  json <- sprintf("{%s}", json)
  writeLines(json, sprintf("../public/data/interviews/%d.json", i))
}
