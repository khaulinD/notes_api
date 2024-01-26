FROM python:3.10-alpine3.19

# Устанавливаем рабочий каталог
WORKDIR /apps/backend
RUN pip install --upgrade pip
# Dependencies, copied first to take advantage of caching.
COPY requirments.txt /temp/requirments.txt


RUN pip install -r /temp/requirments.txt



# Copy the rest of the files.
COPY . /apps/backend
RUN apk add postgresql-client build-base postgresql-dev
COPY entrypoint.sh .

ENTRYPOINT ["sh", "/apps/backend/entrypoint.sh"]

#RUN adduser --disabled-password service-user
#
#USER service-user

#FROM python:3.10.12-slim-buster
#
#WORKDIR /apps/backend
#
#
#COPY **/requirments.txt ./

#RUN python3 -m venv /opt/venv && \
#    /opt/venv/bin/pip install --upgrade pip && \
#    /opt/venv/bin/pip install -r requirments.txt && \
#    chmod +x **/entrypoint.sh
#
#COPY . .
#
#CMD [ "**/entrypoint.sh" ]