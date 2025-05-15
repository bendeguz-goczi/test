import { Directive, Input, OnChanges, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[filterByDomain]'
})
export class FilterByDomainDirective implements OnChanges{
  @Input('filterByDomain') domain: string = '';
  @Input('filterByDomainEmail') email: string = '';

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {}

  ngOnChanges() {
    this.viewContainer.clear();

    if (!this.domain || this.email.split('@')[1] === this.domain) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
