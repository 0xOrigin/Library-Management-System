import { BadRequestException } from '@nestjs/common';
import {
  Equal,
  Not,
  In,
  IsNull,
  Like,
  ILike,
  MoreThan,
  MoreThanOrEqual,
  LessThan,
  LessThanOrEqual,
  Between,
} from 'typeorm';
import { FilterCoreDto } from '../dto/filter-core.dto';
import { IFilterFeature } from '../interfaces/filter.interface';
import { TypeORMOperators } from 'src/config';

export class FilterFeature implements IFilterFeature {
  public generateFilterOptions(
    filterDto: object,
    excludeFields: string[],
  ): object {
    const filterOptions: object = {};
    if (!filterDto) return filterOptions;

    let filterKeys = Object.keys(filterDto);
    filterKeys = filterKeys.filter(
      (key) => !excludeFields.includes(key as keyof FilterCoreDto),
    );

    filterKeys.forEach((key: keyof object) => {
      const filter = this.getFilter(key, filterDto[key]);
      Object.assign(filterOptions, filter);
    });
    return filterOptions;
  }

  private getFilter = (property: any, attr: any): object | never => {
    if (attr === undefined || attr === null)
      throw new BadRequestException('Invalid filtering value');

    let rule: string;
    let value: any;
    if (typeof attr === 'object') {
      rule = Object.keys(attr)[0] as string;
      value = Object.values(attr)[0];
    } else {
      rule = TypeORMOperators.EQUALS;
      value = attr;
    }

    if (!rule) return { [property]: value };
    this.validateFilterRuleValue(rule, value);
    return { [property]: this.getFilterRule(rule, value) };
  };

  private validateFilterRuleValue(rule: string, value: any): void | never {
    const forbiddenRulesForValueTypes = this.getForbiddenRulesForValueTypes();
    let valueType = typeof value;
    if (valueType === 'string' && (value === 'true' || value === 'false'))
      valueType = 'boolean'; // In case of boolean string resulting from using filter operators
    if (forbiddenRulesForValueTypes[valueType]?.includes(rule))
      throw new BadRequestException(
        `Invalid filtering rule for value type ${valueType}`,
      );
  }

  private getForbiddenRulesForValueTypes(): Record<string, Array<string>> {
    return {
      boolean: [
        TypeORMOperators.IN,
        TypeORMOperators.NOT_IN,
        TypeORMOperators.LIKE,
        TypeORMOperators.NOT_LIKE,
        TypeORMOperators.ILIKE,
        TypeORMOperators.NOT_ILIKE,
        TypeORMOperators.GREATER_THAN,
        TypeORMOperators.GREATER_THAN_OR_EQUAL,
        TypeORMOperators.LESS_THAN,
        TypeORMOperators.LESS_THAN_OR_EQUAL,
        TypeORMOperators.BETWEEN,
        TypeORMOperators.NOT_BETWEEN,
      ],
      number: [
        TypeORMOperators.LIKE,
        TypeORMOperators.NOT_LIKE,
        TypeORMOperators.ILIKE,
        TypeORMOperators.NOT_ILIKE,
      ],
    } as const;
  }

  private getFilterRule(rule: string, value: any): any {
    switch (rule) {
      case TypeORMOperators.EQUALS:
        return Equal(value);
      case TypeORMOperators.NOT_EQUALS:
        return Not(value);
      case TypeORMOperators.IN:
        return In(value.split(','));
      case TypeORMOperators.NOT_IN:
        return Not(In(value.split(',')));
      case TypeORMOperators.IS_NULL:
        return IsNull();
      case TypeORMOperators.IS_NOT_NULL:
        return Not(IsNull());
      case TypeORMOperators.LIKE:
        return Like(`%${value}%`);
      case TypeORMOperators.NOT_LIKE:
        return Not(Like(`%${value}%`));
      case TypeORMOperators.ILIKE:
        return ILike(`%${value}%`);
      case TypeORMOperators.NOT_ILIKE:
        return Not(ILike(`%${value}%`));
      case TypeORMOperators.GREATER_THAN:
        return MoreThan(value);
      case TypeORMOperators.GREATER_THAN_OR_EQUAL:
        return MoreThanOrEqual(value);
      case TypeORMOperators.LESS_THAN:
        return LessThan(value);
      case TypeORMOperators.LESS_THAN_OR_EQUAL:
        return LessThanOrEqual(value);
      case TypeORMOperators.BETWEEN:
        return Between(value.split(',')[0], value.split(',')[1]);
      case TypeORMOperators.NOT_BETWEEN:
        return Not(Between(value.split(',')[0], value.split(',')[1]));
      default:
        throw new BadRequestException('Invalid filtering rule');
    }
  }
}
