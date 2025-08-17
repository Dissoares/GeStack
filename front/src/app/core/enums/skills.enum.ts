export class SkillsEnum {
  public static readonly ANGULAR = new SkillsEnum(1, 'ANGULAR', 'Angular', 'frontend');
  public static readonly REACT = new SkillsEnum(2, 'REACT', 'React', 'frontend');
  public static readonly VUE_JS = new SkillsEnum(3, 'VUE_JS', 'Vue.js', 'frontend');
  public static readonly TYPESCRIPT = new SkillsEnum(4, 'TYPESCRIPT', 'TypeScript', 'frontend');
  
  
  public static readonly SPRING = new SkillsEnum(5, 'SPRING', 'Spring', 'backend');
  public static readonly DOT_NET = new SkillsEnum(6, 'DOT_NET', '.NET', 'backend');
  public static readonly PHP = new SkillsEnum(7, 'PHP', 'PHP', 'backend');  
  public static readonly LARAVEL = new SkillsEnum(8, 'LARAVEL', 'Laravel', 'backend');
  public static readonly PYTHON = new SkillsEnum(9, 'PYTHON', 'Python', 'backend');
  public static readonly NODE_JS = new SkillsEnum(10, 'NODE_JS', 'Node.js', 'backend');
  
  
  public static readonly MSSQL_SERVER = new SkillsEnum(11, 'MSSQL_SERVER', 'SQL Server', 'database');
  public static readonly MYSQL = new SkillsEnum(12, 'MYSQL', 'MySQL', 'database');
  public static readonly POSTGRESQL = new SkillsEnum(13, 'POSTGRESQL', 'PostgreSQL', 'database');
  public static readonly MONGODB = new SkillsEnum(14, 'MONGODB', 'MongoDB', 'database');
  public static readonly ORACLE = new SkillsEnum(15, 'ORACLE', 'Oracle', 'database');
  

  public static readonly ANDROID = new SkillsEnum(16, 'ANDROID', 'Android', 'mobile');
  public static readonly IOS = new SkillsEnum(17, 'IOS', 'iOS', 'mobile');
  public static readonly FLUTTER = new SkillsEnum(18, 'FLUTTER', 'Flutter', 'mobile');
  public static readonly REACT_NATIVE = new SkillsEnum(19, 'REACT_NATIVE', 'React Native', 'mobile');
  

  public static readonly DOCKER = new SkillsEnum(20, 'DOCKER', 'Docker', 'devops');
  public static readonly KUBERNETES = new SkillsEnum(21, 'KUBERNETES', 'Kubernetes', 'devops');
  public static readonly AWS = new SkillsEnum(22, 'AWS', 'AWS', 'devops');
  public static readonly AZURE = new SkillsEnum(23, 'AZURE', 'Azure', 'devops');
  public static readonly GCP = new SkillsEnum(24, 'GCP', 'Google Cloud', 'devops');

  private constructor(
    public readonly id: number,
    public readonly tag: string,
    public readonly descricao: string,
    public readonly categoria: string
  ) {}

  public static getAll(): Array<SkillsEnum> {
    return [
      this.ANGULAR,
      this.REACT,
      this.VUE_JS,
      this.TYPESCRIPT,
      this.SPRING,
      this.DOT_NET,
      this.PHP,
      this.LARAVEL,
      this.PYTHON,
      this.NODE_JS,
      this.MSSQL_SERVER,
      this.MYSQL,
      this.POSTGRESQL,
      this.MONGODB,
      this.ORACLE,
      this.ANDROID,
      this.IOS,
      this.FLUTTER,
      this.REACT_NATIVE,
      this.DOCKER,
      this.KUBERNETES,
      this.AWS,
      this.AZURE,
      this.GCP,
    ];
  }

  public static getById(id: number): SkillsEnum | undefined {
    return this.getAll().find((skill) => skill.id === id);
  }
}
