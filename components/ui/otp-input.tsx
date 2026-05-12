import { useRef } from 'react';
import { Pressable, TextInput, View } from 'react-native';

import { AppText } from '@/components/ui/text';

export type OtpInputProps = {
  error?: string;
  helperText?: string;
  label: string;
  length: number;
  onChangeText: (value: string) => void;
  value: string;
};

export function OtpInput({ error, helperText, label, length, onChangeText, value }: OtpInputProps) {
  const inputRef = useRef<TextInput>(null);
  const digits = Array.from({ length }, (_, index) => value[index] ?? '');

  function handleChange(nextValue: string) {
    onChangeText(nextValue.replace(/\D/g, '').slice(0, length));
  }

  return (
    <View className="gap-3">
      <AppText className="text-foreground-dark" variant="label">
        {label}
      </AppText>

      <Pressable
        className="flex-row justify-between gap-2"
        onPress={() => inputRef.current?.focus()}>
        {digits.map((digit, index) => {
          const isActive = index === value.length && value.length < length;

          return (
            <View
              className={[
                'h-14 flex-1 items-center justify-center rounded-2xl border bg-pario-ink-raised',
                error
                  ? 'border-red-500'
                  : isActive
                    ? 'border-accent'
                    : 'border-pario-ink-border',
              ].join(' ')}
              key={index}>
              <AppText className="text-xl font-semibold text-foreground-dark">{digit}</AppText>
            </View>
          );
        })}
      </Pressable>

      <TextInput
        autoFocus
        caretHidden
        className="absolute h-0 w-0 opacity-0"
        keyboardType="number-pad"
        maxLength={length}
        onChangeText={handleChange}
        ref={inputRef}
        textContentType="oneTimeCode"
        value={value}
      />

      {error ? <AppText className="text-red-500">{error}</AppText> : null}
      {!error && helperText ? (
        <AppText className="text-muted-foreground-dark" variant="muted">
          {helperText}
        </AppText>
      ) : null}
    </View>
  );
}
