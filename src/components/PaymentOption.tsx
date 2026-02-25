import { useState } from "react";
import { CreditCard, Smartphone, Building2 } from "lucide-react";

const PAYMENT_OPTIONS = [
  { id: "apple", label: "Apple Pay", icon: Smartphone },
  { id: "card", label: "Credit Card", icon: CreditCard },
  { id: "insurance", label: "Insurance", icon: Building2 },
];

const PaymentOption = ({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Payment Option</h3>
      <div className="space-y-2">
        {PAYMENT_OPTIONS.map((option) => {
          const isSelected = option.id === selected;
          const Icon = option.icon;
          return (
            <button
              key={option.id}
              onClick={() => onSelect(option.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3.5 transition-all duration-200 ${
                isSelected
                  ? "bg-secondary border-2 border-primary"
                  : "bg-card border border-border hover:bg-secondary"
              }`}
            >
              <Icon className={`h-5 w-5 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
              <span className={`text-sm font-medium ${isSelected ? "text-foreground" : "text-muted-foreground"}`}>
                {option.label}
              </span>
              <div
                className={`ml-auto h-5 w-5 rounded-full border-2 transition-colors ${
                  isSelected ? "border-primary bg-primary" : "border-muted-foreground/30"
                }`}
              >
                {isSelected && (
                  <div className="flex h-full w-full items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary-foreground" />
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentOption;
