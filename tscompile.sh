tsc --module commonjs app.ts
echo "compiled app.ts"
cd ./data_accessors
tsc --module commonjs *.ts
echo "compiled files in /data_accessors"
cd ../interfaces
tsc --module commonjs *.ts
echo "compiled files in /interfaces"
cd ../models
tsc --module commonjs *.ts
echo "compiled files in /models"
cd ../routes
tsc --module commonjs *.ts
echo "compiled files in /routes"
cd ../services
tsc --module commonjs *.ts
echo "compiled files in /services"