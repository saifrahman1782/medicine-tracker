import { Component, inject, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar';
import { CalendarMode, QueryMode, Step } from 'ionic2-calendar';
import { ModalController } from '@ionic/angular';
import { EventsPage } from 'src/app/pages/events/events.page';
import { LocalNotifications, LocalNotificationSchema } from '@capacitor/local-notifications';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  showAddEvent: boolean;
  @ViewChild(CalendarComponent) myCalendar!: CalendarComponent;

  constructor(public modalCtrl: ModalController) {
    this.showAddEvent = false;
    this.isToday = false;
  }

  eventSource: any = [];
  viewTitle: any;

  isToday: boolean
  calendar = {
    mode: 'month' as CalendarMode,
    queryMode: 'local' as QueryMode,
    step: 30 as Step,
    currentDate: new Date(),
    dateFormatter: {
      formatMonthViewDay: function (date: Date) {
        return date.getDate().toString();
      },
      formatMonthViewDayHeader: function (date: Date) {
        return 'MonMH';
      },
      formatMonthViewTitle: function (date: Date) {
        return 'testMT';
      },
      formatWeekViewDayHeader: function (date: Date) {
        return 'MonWH';
      },
      formatWeekViewTitle: function (date: Date) {
        return 'testWT';
      },
      formatWeekViewHourColumn: function (date: Date) {
        return 'testWH';
      },
      formatDayViewHourColumn: function (date: Date) {
        return 'testDH';
      },
      formatDayViewTitle: function (date: Date) {
        return 'testDT';
      },
    },
    formatDay: "'Day' dd",
    formatDayHeader: "'Day' EEE",
    formatDayTitle: "'Day' MMMM dd, yyyy",
    formatWeekTitle: "'Week' w",
    formatWeekViewDayHeader: "'Day' EEE d",
    formatHourColumn: "'hour' ha",
    showEventDetail: false,
    startingDayMonth: 2,
    startingDayWeek: 2,
    allDayLabel: 'testallday',
    noEventsLabel: 'None',
    timeInterval: 15,
    autoSelect: false,
    locale: 'zh-CN',
    dir: 'rtl',
    scrollToHour: 3,
    preserveScrollPosition: true,
    lockSwipeToPrev: true,
    lockSwipeToNext: true,
    lockSwipes: true,
    startHour: 0,
    endHour: 24,
    sliderOptions: {
      spaceBetween: 10,
    },
  };

  newEvent = {
    title:'',
    description:'',
    startTime:'',
    endTime:'',
    img:'',
  }


  onViewTitleChanged(title: string) {
    this.viewTitle = title;
    console.log(
      'view title changed: ' + title + ', this.viewTitle: ' + this.viewTitle
    );
  }

 async onEventSelected(event: any) {
  this.newEvent = event;
  const modal = await this.modalCtrl.create({
    component: EventsPage,
    componentProps: event
  });
    console.log(
      'Event selected:' +
        event.startTime +
        '-' +
        event.endTime +
        ',' +
        event.title
    );
    return await modal.present();
  }

  changeMode(mode: any) {
    this.calendar.mode = mode;
  }

  today() {
    this.calendar.currentDate = new Date();
  }

  onTimeSelected(ev: any) {
    console.log(
      'Selected time: ' +
        ev.selectedTime +
        ', hasEvents: ' +
        (ev.events !== undefined && ev.events.length !== 0) +
        ', disabled: ' +
        ev.disabled
    );
  }

  onCurrentDateChanged(ev: Date) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    ev.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === ev.getTime();
    console.log('Currently viewed date: ' + ev);
  }

  onDayHeaderSelected = (ev: {
    selectedTime: Date;
    events: any[];
    disabled: boolean;
  }) => {
    console.log(
      'Selected day: ' +
        ev.selectedTime +
        ', hasEvents: ' +
        (ev.events !== undefined && ev.events.length !== 0) +
        ', disabled: ' +
        ev.disabled
    );
  };

  markDisabled = (date: Date) => {
    var current = new Date();
    current.setHours(0, 0, 0);
    return date < current;
  };

  next() {
    this.myCalendar.slideNext();
  }

  back() {
    this.myCalendar.slidePrev();
  }

  async sendNotification(event: any) {
    const now = new Date().getTime();
    const endTime = new Date(event.endTime).getTime();
    const timeDiff = endTime - now;
  
    if (timeDiff > 0 && timeDiff <= 60000) {
      const notification: LocalNotificationSchema = {
        title: 'Dosage period over!',
        body: 'feel free to take your next dosage',
        id: 1,
        schedule: { at: new Date(Date.now() + 1000) },
        sound: 'default',
        attachments: [],
        actionTypeId: 'SOME_ACTION',
        extra: null
      };
  
      await LocalNotifications.schedule({ notifications: [notification] });
    }
  }
  
  

  addEvent() {
    this.eventSource.push({
      title: this.newEvent.title,
      startTime: new Date(this.newEvent.startTime),
      endTime: new Date(this.newEvent.endTime),
      description: this.newEvent.description,
    });
  
    this.sendNotification(this.newEvent);
  
    this.showHideForm();
  }
  
  showHideForm() {
    this.showAddEvent = !this.showAddEvent;
    this.newEvent = {
      title: '',
      description:'',
      img:'',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
    };
  }
}