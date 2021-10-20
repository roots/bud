#!/bin/bash

curl --silent --show-error https://getcomposer.org/installer | php \
  && chmod +x composer.phar \
  && mv composer.phar /usr/bin/composer \
  && composer -v
