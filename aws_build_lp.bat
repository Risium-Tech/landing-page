call docker build -f Dockerfile -t jaodev/mosaicos/landingpage:latest .
call docker tag jaodev/mosaicos/landingpage:latest 248189947465.dkr.ecr.sa-east-1.amazonaws.com/mosaicos/landingpage:latest
call aws ecr get-login-password --region sa-east-1 --profile jaodev | docker login --username AWS --password-stdin 248189947465.dkr.ecr.sa-east-1.amazonaws.com
call docker push 248189947465.dkr.ecr.sa-east-1.amazonaws.com/mosaicos/landingpage:latest
call docker rmi 248189947465.dkr.ecr.sa-east-1.amazonaws.com/mosaicos/landingpage:latest
