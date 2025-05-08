
import { useState, useEffect } from "react";
import { Lock, Copy, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import PasswordStrength from "./PasswordStrength";

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Gera senha com base nas opções selecionadas
  const generatePassword = () => {
    let charset = "";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    // Verificar se pelo menos uma opção foi selecionada
    if (!charset) {
      setIncludeLowercase(true);
      charset = "abcdefghijklmnopqrstuvwxyz";
      toast.warning("Pelo menos um tipo de caractere deve ser selecionado.");
    }

    let newPassword = "";
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }

    setPassword(newPassword);
  };

  // Calcular força da senha
  useEffect(() => {
    if (!password) {
      setPasswordStrength(0);
      return;
    }

    let strength = 0;
    
    // Comprimento
    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;
    if (password.length >= 16) strength += 1;
    
    // Complexidade
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSymbols = /[^A-Za-z0-9]/.test(password);
    
    if (hasUppercase) strength += 1;
    if (hasLowercase) strength += 1;
    if (hasNumbers) strength += 1;
    if (hasSymbols) strength += 1;
    
    // Normalizar entre 0-4
    const normalizedStrength = Math.min(4, Math.max(0, Math.floor(strength / 2)));
    setPasswordStrength(normalizedStrength);
  }, [password]);

  // Gera senha no carregamento inicial
  useEffect(() => {
    generatePassword();
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    toast.success("Senha copiada para a área de transferência!");
  };

  return (
    <div className="bg-gradient-to-b from-[#242e45] to-[#1d2436] rounded-xl shadow-2xl overflow-hidden border border-[#3a4357]">
      {/* Cabeçalho */}
      <div className="bg-gradient-to-r from-[#2c3549] to-[#202a40] p-6 flex items-center justify-center border-b border-[#3a4357]">
        <div className="bg-[#2d3d65] rounded-full p-3 mr-3">
          <Lock className="h-6 w-6 text-[#9b87f5]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Gerador de Senhas</h1>
          <p className="text-[#a0aec0]">Gere instantaneamente uma senha aleatória e segura</p>
        </div>
      </div>

      {/* Área da senha */}
      <div className="p-6">
        <div className="relative">
          <div className="bg-[#1a2032] text-[#0FA0CE] rounded-lg p-4 text-xl font-mono flex items-center justify-between mb-6 overflow-x-auto border border-[#3a4357]">
            <div className="truncate">{password}</div>
            <div className="flex space-x-2 ml-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={generatePassword} 
                className="hover:bg-[#2d3649] text-[#9b87f5]"
              >
                <RefreshCw className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={copyToClipboard} 
                className="hover:bg-[#2d3649] text-[#9b87f5]"
              >
                <Copy className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Indicador de força */}
        <div className="mb-6">
          <div className="flex justify-between mb-1">
            <span className="text-sm text-[#a0aec0]">Força da senha</span>
            <span className="text-sm font-semibold">
              {passwordStrength === 0 && "Muito fraca"}
              {passwordStrength === 1 && "Fraca"}
              {passwordStrength === 2 && "Média"}
              {passwordStrength === 3 && "Forte"}
              {passwordStrength === 4 && "Muito forte"}
            </span>
          </div>
          <PasswordStrength strength={passwordStrength} />
        </div>

        {/* Personalizações */}
        <div className="bg-[#212939] rounded-lg p-6 mb-6 border border-[#3a4357]">
          <h2 className="text-lg font-semibold mb-4 text-white">Personalize sua senha</h2>
          
          {/* Controle do tamanho */}
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-[#a0aec0]">Número de caracteres</span>
              <span className="font-mono bg-[#2c3549] px-2 py-0.5 rounded text-[#9b87f5]">{passwordLength}</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setPasswordLength(Math.max(4, passwordLength - 1))}
                className="bg-[#1a2032] border-[#3a4357] hover:bg-[#2d3649] text-[#a0aec0] hover:text-white"
              >
                -
              </Button>
              <Slider
                value={[passwordLength]}
                min={4}
                max={32}
                step={1}
                onValueChange={(value) => setPasswordLength(value[0])}
                className="flex-1"
              />
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setPasswordLength(Math.min(32, passwordLength + 1))}
                className="bg-[#1a2032] border-[#3a4357] hover:bg-[#2d3649] text-[#a0aec0] hover:text-white"
              >
                +
              </Button>
            </div>
          </div>
          
          {/* Opções de caracteres */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="uppercase" 
                checked={includeUppercase} 
                onCheckedChange={(checked) => setIncludeUppercase(!!checked)} 
                className="data-[state=checked]:bg-[#9b87f5] data-[state=checked]:border-[#9b87f5]"
              />
              <div className="grid gap-1.5 leading-none">
                <label htmlFor="uppercase" className="text-sm font-medium leading-none cursor-pointer">
                  Letras maiúsculas
                </label>
                <p className="text-xs text-muted-foreground">A-Z</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="lowercase" 
                checked={includeLowercase} 
                onCheckedChange={(checked) => setIncludeLowercase(!!checked)} 
                className="data-[state=checked]:bg-[#9b87f5] data-[state=checked]:border-[#9b87f5]"
              />
              <div className="grid gap-1.5 leading-none">
                <label htmlFor="lowercase" className="text-sm font-medium leading-none cursor-pointer">
                  Letras minúsculas
                </label>
                <p className="text-xs text-muted-foreground">a-z</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="numbers" 
                checked={includeNumbers} 
                onCheckedChange={(checked) => setIncludeNumbers(!!checked)} 
                className="data-[state=checked]:bg-[#9b87f5] data-[state=checked]:border-[#9b87f5]"
              />
              <div className="grid gap-1.5 leading-none">
                <label htmlFor="numbers" className="text-sm font-medium leading-none cursor-pointer">
                  Números
                </label>
                <p className="text-xs text-muted-foreground">0-9</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="symbols" 
                checked={includeSymbols} 
                onCheckedChange={(checked) => setIncludeSymbols(!!checked)} 
                className="data-[state=checked]:bg-[#9b87f5] data-[state=checked]:border-[#9b87f5]"
              />
              <div className="grid gap-1.5 leading-none">
                <label htmlFor="symbols" className="text-sm font-medium leading-none cursor-pointer">
                  Símbolos
                </label>
                <p className="text-xs text-muted-foreground">!@#$%^&*</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Botões de ação */}
        <div className="flex justify-center">
          <Button 
            onClick={generatePassword} 
            className="bg-gradient-to-r from-[#9b87f5] to-[#8a67f7] hover:from-[#8a67f7] hover:to-[#7a57e7] text-white font-semibold py-2 px-6 rounded-md shadow-lg hover:shadow-xl transition-all duration-300 text-sm"
          >
            Gerar Nova Senha
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
