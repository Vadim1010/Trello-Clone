import { TaskItemComponent } from './task-item.component';

describe(' Task Item Component', function () {
  const sut: any = new TaskItemComponent();

  it('should match interface', () => {
    expect(sut.task).toBeDefined();
    expect(sut.userStatus).toBeDefined();
    expect(sut.onClickHandler).toBeDefined();
    expect(sut.onDeleteTaskHandler).toBeDefined();
    expect(sut.onDeleteTaskHandler).toBeDefined();
    expect(sut.openDialog).toBeDefined();
    expect(sut.onDeleteTask).toBeDefined();
  });

  describe('#openDialog', () => {
    let onClickHandlerSpy: jasmine.Spy;
    let value: string = 'Hello';

    beforeEach(() => {
      onClickHandlerSpy = spyOn(sut.changeInput, 'emit');

      sut.openDialog(value);
    });

    it('should emit onClickHandler', () => {
      expect(onClickHandlerSpy).toHaveBeenCalledWith('Hello');
    });
  });

  describe('#onDeleteTask', () => {
    let onDeleteTaskHandlerSpy: jasmine.Spy;
    let value: string = 'Hello';

    beforeEach(() => {
      onDeleteTaskHandlerSpy = spyOn(sut.changeInput, 'emit');

      sut.onDeleteTask(value);
    });

    it('should emit onDeleteTaskHandler', () => {
      expect(onDeleteTaskHandlerSpy).toHaveBeenCalledWith('Hello');
    });
  });
});
