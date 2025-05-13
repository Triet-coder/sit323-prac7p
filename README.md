Step by step introductions:
1. Start Minikube
minikube start
2. Set Up MongoDB in Kubernetes
kubectl apply -f kubernetes/mongo-secret.yaml
kubectl apply -f kubernetes/mongo-pv.yaml
kubectl apply -f kubernetes/mongo-pvc.yaml
kubectl apply -f kubernetes/mongo-deployment.yaml
kubectl apply -f kubernetes/mongo-service.yaml
3. Build and Push the Docker Image
docker build -t your-dockerhub-username/your-app-image .
docker push your-dockerhub-username/your-app-image
4. Deploy Your App to Kubernetes
Update app-deployment.yaml to use your Docker image, then:
kubectl apply -f kubernetes/app-deployment.yaml
kubectl apply -f kubernetes/app-service.yaml
5. Port Forward and Test
kubectl port-forward svc/my-app-service 3000:3000
In another terminal:
$body = @{ name = "Alice" } | ConvertTo-Json -Compress
Invoke-RestMethod -Uri http://localhost:3000/users -Method POST -Body $body -ContentType "application/json"
MongoDB Backup & Restore
Backup (inside pod):
kubectl exec -it deploy/mongo -- bash
mongodump -u mongoadmin -p password --authenticationDatabase admin --out /data/backup
Copy Backup to Local Machine:
kubectl cp <mongo-pod-name>:/data/backup ./mongo-backup
