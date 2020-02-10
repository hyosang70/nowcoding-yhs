import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
import { LoginComponent } from './main/login/login.component';
import { FindidComponent } from './main/findid/findid.component';
import { FindpasswordComponent } from './main/findpassword/findpassword.component';
// ---outlet Join----
import { JoinlayoutComponent } from './joinlayout/joinlayout.component';
import { JoinComponent } from './joinlayout/join/join.component';
import { StudentComponent } from './joinlayout/student/student.component';
import { TeacherComponent } from './joinlayout/teacher/teacher.component';
import { TeacherTrialComponent } from './joinlayout/teacherTrial/teacher.component';
import { JoinFormComponent } from './joinlayout/join-form/join-form.component';

// ---block---
import { BoardComponent } from './game/board/board.component';
import { MazeComponent } from './game/maze/maze.component';
import { PangComponent } from './game/pang/pang.component';

import { MypageComponent } from './mypage/mypage/mypage.component';
import { ClassComponent } from './mypage/class/class.component';
import { SettingComponent } from './mypage/setting/setting.component';

import { PasswordComponent } from './mypage/setting/popup/password/password.component';
import { MailComponent } from './mypage/setting/popup/mail/mail.component';
import { ConfirmComponent } from './mypage/setting/popup/confirm/confirm.component';
import { ClassInfoComponent } from './mypage/class/class-info/class-info.component';

const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    children: [
      { path: '', component: LoginComponent },
      { path: 'password', component: FindpasswordComponent },
      { path: 'id', component: FindidComponent }
    ]
  },
  {
    path: 'join',
    component: JoinlayoutComponent,
    children: [
      { path: '', component: JoinComponent },
      { path: 'student', component: StudentComponent },
      { path: 'student/:step', component: StudentComponent },
      { path: 'teacher', component: TeacherComponent },
      { path: 'teacher/:step', component: TeacherComponent },
      { path: 'teacherTrial', component: TeacherTrialComponent },
      { path: 'teacherTrial/:step', component: TeacherTrialComponent }
    ]
  },
  {
    path: 'lecture',
    component: BoardComponent,
    children: [
      { path: 'mz/:level/:type', component: MazeComponent },
      // mz/999/HC
      // mz/999/HH

      // mz/999/MC
      // mz/999/MH

      // mz/999/LC
      // mz/999/LH
      // cy
      // np
      { path: 'np/:level/:type', component: PangComponent }
    ]
  },
  {
    path: 'mypage',
    component: MypageComponent,
    children: [
      { path: '', component: ClassComponent },
      { path: 'class', component: ClassComponent },
      { path: 'class/:id', component: ClassInfoComponent },
      { path: 'setting', component: SettingComponent },
      { path: 'setting/password', component: PasswordComponent },
      { path: 'setting/mail', component: MailComponent },
      { path: 'setting/confirm', component: ConfirmComponent }
    ]
  },
  { path: '**', redirectTo: '/main', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
