# Start from a base nginx image
FROM docker.io/nginx:1.25.4
# Copy the book of programming website directory into /usr/share/nginx/html
COPY ./website /usr/share/nginx/html/website
# Change the permissions of the /usr/share/nginx/html directory
RUN chmod -R +rx /usr/share/nginx/html/
