import gulp from 'gulp';
import markd from "./scripts/markd";
import {sketch2json, json2sketch} from './scripts/sketch'

gulp.task('markd', markd);