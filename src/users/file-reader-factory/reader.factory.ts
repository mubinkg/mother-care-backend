import { Injectable, NotAcceptableException } from '@nestjs/common';
const csv = require('csv-parser')
const XLS = require('xlsjs');
import { Stream } from 'stream';

@Injectable()
export class FileReaderFactory{
    private fileMimeType = {
        'xlsx':1,
        'xls': 1,
        'csv':1
    }

    constructor(){
    }

    async create(file:Express.Multer.File){
        const ext = file.originalname.split('.').pop();
        if(!this.fileMimeType[ext]){
             throw new NotAcceptableException('This file formate is not supportable.')
        }
        if(ext === 'csv'){
            return await this.readCsvData(file);
        }
        else if(ext === 'xls' || ext === 'xlsx'){
            return await this.readXLSFromBuffer(file)
        }
    }

    readCsvData(file:Express.Multer.File){
        return new Promise((resolve, reject)=>{
            const bufferStream = new Stream.PassThrough();
            bufferStream.end(file.buffer)
            const results = [];
            bufferStream
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', () => {
                    resolve(results);
                })
                .on('error', ()=>{
                    reject('Error on csv parsing.')
                })
        })
    }

    private readXLSFromBuffer(file:Express.Multer.File) {
        return new Promise((resolve, reject) => {
          try {
            const workbook = XLS.read(file.buffer, { type: 'buffer' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const data = XLS.utils.sheet_to_json(sheet);
      
            resolve(data);
          } catch (error) {
            reject(error);
          }
        });
    }
}