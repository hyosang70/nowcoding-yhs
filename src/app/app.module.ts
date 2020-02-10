// 코어
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// 서비스에 필요한 외부 npm 패키지
import { ToastrModule } from 'ngx-toastr';
import { AceEditorModule } from 'ng2-ace-editor';
import { NgCircleProgressModule } from 'ng-circle-progress';

// 페이지들
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MainComponent } from './main/main.component';

import { JoinlayoutComponent } from './joinlayout/joinlayout.component';
import { JoinComponent } from './joinlayout/join/join.component';
import { StudentComponent } from './joinlayout/student/student.component';
import { JoinFormComponent } from './joinlayout/join-form/join-form.component';

import { MazeComponent } from './game/maze/maze.component';
import { BoardComponent } from './game/board/board.component';

import { PangComponent } from './game/pang/pang.component';
import { TeacherComponent } from './joinlayout/teacher/teacher.component';
import { TeacherTrialComponent } from './joinlayout/teacherTrial/teacher.component';

import { MypageComponent } from './mypage/mypage/mypage.component';
import { ClassComponent } from './mypage/class/class.component';

import { SettingComponent } from './mypage/setting/setting.component';
import { PasswordComponent } from './mypage/setting/popup/password/password.component';
import { MailComponent } from './mypage/setting/popup/mail/mail.component';
import { ConfirmComponent } from './mypage/setting/popup/confirm/confirm.component';
import { ClassInfoComponent } from './mypage/class/class-info/class-info.component';
import { NgInitDirective } from './directive/ng-init.directive';

// 모달 페이지
import { ModalModule } from 'ngx-bootstrap/modal';
import { ClassSearchComponent } from './modal/class-search/class-search.component';
import { ClassListComponent } from './modal/class-list/class-list.component';
import { ClsssAllowedComponent } from './modal/clsss-allowed/clsss-allowed.component';
import { ClsssNoallowedComponent } from './modal/clsss-noallowed/clsss-noallowed.component';
import { ClassClearComponent } from './modal/class-clear/class-clear.component';
import { ClassStartComponent } from './modal/class-start/class-start.component';
import { ClassEndComponent } from './modal/class-end/class-end.component';
import { PopupComponent } from './modal/popup/popup.component';

// ??
import { MazeService } from './service/maze.service';
import { FindpasswordComponent } from './main/findpassword/findpassword.component';
import { FindidComponent } from './main/findid/findid.component';
import { LoginComponent } from './main/login/login.component';

@NgModule({
  declarations: [
    AppComponent,

    MainComponent,

    JoinlayoutComponent,
    JoinComponent,
    StudentComponent,
    JoinFormComponent,

    MazeComponent,
    BoardComponent,
    ClassComponent,
    PangComponent,
    TeacherComponent,
    TeacherTrialComponent,
    MypageComponent,
    SettingComponent,
    PasswordComponent,
    MailComponent,
    ConfirmComponent,
    ClassInfoComponent,
    NgInitDirective,

    // 모달 컴포넌트
    ClassSearchComponent,
    ClassListComponent,
    ClsssAllowedComponent,
    ClsssNoallowedComponent,
    ClassClearComponent,
    ClassStartComponent,
    ClassEndComponent,
    PopupComponent,
    FindpasswordComponent,
    FindidComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,

    AceEditorModule,
    NgCircleProgressModule.forRoot({}),
    ToastrModule.forRoot(),
    ModalModule.forRoot()
  ],
  entryComponents: [
    ClassSearchComponent,
    ClassListComponent,
    ClsssAllowedComponent,
    ClsssNoallowedComponent,
    ClassClearComponent,
    ClassStartComponent,
    ClassEndComponent,
    PopupComponent
  ],
  providers: [MazeService],
  bootstrap: [AppComponent]
})
export class AppModule {}
