// Instale primeiro:  npm i decimal.js
import Decimal from "decimal.js";
import { s } from "@omariosouto/common-schema";

export type MoneyInput = Money | number | string | Decimal;

interface MoneyOptions {
  currency?: string;        // Ex.: "BRL", "USD"
  locale?:   string;        // Ex.: "pt-BR", "en-US"
  minorUnit?: number;       // casas decimais do centavo (padrão 2)
}

export default class Money {
  private readonly value: Decimal;
  readonly currency: string;
  readonly locale:   string;
  readonly minorUnit: number;

  /* ---------- CONSTRUTOR ---------- */
  constructor(
    amount: MoneyInput = 0,
    { currency = "BRL", locale = "pt-BR", minorUnit = 2 }: MoneyOptions = {},
  ) {
    this.value     = Money.coerce(amount);
    this.currency  = currency;
    this.locale    = locale;
    this.minorUnit = minorUnit;
  }

  /* ---------- HELPERS ESTÁTICOS ---------- */
  private static coerce(v: MoneyInput): Decimal {
    if (v instanceof Money)   return v.value;
    if (v instanceof Decimal) return v;
    return new Decimal(v);          // aceita string ou number
  }

  /** Constrói a partir de centavos (minor‑units) */
  static fromMinor(minor: number | string, opts?: MoneyOptions): Money {
    const { minorUnit = 2 } = opts ?? {};
    const divisor = new Decimal(10).pow(minorUnit);
    return new Money(new Decimal(minor).div(divisor), opts);
  }

  /* ---------- OPERAÇÕES ARITMÉTICAS ---------- */
  add(other: MoneyInput): Money {
    return new Money(this.value.plus(Money.coerce(other)), this);
  }

  sub(other: MoneyInput): Money {
    return new Money(this.value.minus(Money.coerce(other)), this);
  }

  mul(factor: number | string | Decimal): Money {
    return new Money(this.value.times(factor), this);
  }

  div(divisor: number | string | Decimal): Money {
    return new Money(this.value.div(divisor), this);
  }

  /* ---------- COMPARAÇÕES ---------- */
  cmp(other: MoneyInput): -1 | 0 | 1 {
    return this.value.comparedTo(Money.coerce(other)) as -1 | 0 | 1;
  }
  lt(other: MoneyInput) { return this.cmp(other) === -1; }
  lte(other: MoneyInput){ return this.cmp(other) !==  1; }
  gt(other: MoneyInput) { return this.cmp(other) ===  1; }
  gte(other: MoneyInput){ return this.cmp(other) !== -1; }
  eq(other: MoneyInput) { return this.cmp(other) ===  0; }

  /* ---------- FORMATAÇÃO ---------- */
  /** Ex.: `R$ 10,50` ou `$10.50` */
  format(opts: Intl.NumberFormatOptions = {}): string {
    const nf = new Intl.NumberFormat(this.locale, {
      style: "currency",
      currency: this.currency,
      minimumFractionDigits: this.minorUnit,
      maximumFractionDigits: this.minorUnit,
      ...opts,
    });
    return nf.format(this.value.toNumber());
  }

  /** Representação em centavos/micro‑unidades inteiras */
  toMinor(): string {
    const factor = new Decimal(10).pow(this.minorUnit);
    return this.value.times(factor).toFixed(0);
  }

  toString()  { return this.value.toFixed(this.minorUnit); }
  toJSON()    { return this.toString(); }
  valueOf()   { return this.value.toNumber(); }
}

export const moneySchema = s
  .union([                       // tipos de entrada aceitos
    s.instanceof(Money),         // já é Money
    s.number(),                  // 10  → R$ 10,00
    s.string(),                  // "10.50" → R$ 10,50 (ou USD 10.50, depende de opções)
  ])
  .transform<Money>((raw, ctx) => {
    try {
      return new Money(raw as MoneyInput);
    } catch (err) {
      ctx.addIssue({
        code:  "custom",
        message: "Valor inválido para Money",
      });
      return s.NEVER;
    }
  });