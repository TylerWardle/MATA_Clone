call tsc --module commonjs app.ts
echo "compiled app.ts"

cd data_accessors
call :COMPILE_TS
echo "compiled files in /data_accessors"

cd ..\interfaces
call :COMPILE_TS
echo "compiled files in /interfaces"

cd ..\models
call :COMPILE_TS
echo "compiled files in /models"

cd ..\routes
call :COMPILE_TS
echo "compiled files in /routes"

cd ..\services
call :COMPILE_TS
echo "compiled files in /services"

cd ..

:COMPILE_TS
	dir /b *.ts > _tsfiles.txt
	call tsc --module commonjs @_tsfiles.txt
	del _tsfiles.txt