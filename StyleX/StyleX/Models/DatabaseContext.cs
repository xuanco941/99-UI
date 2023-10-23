using Microsoft.EntityFrameworkCore;

namespace StyleX.Models
{
    public class DatabaseContext : DbContext
    {
        private readonly IConfiguration _configuration;

        public DbSet<Admin> Admins { get; set; } = null!;


        public DatabaseContext(DbContextOptions<DatabaseContext> options, IConfiguration configuration)
    : base(options)
        {
            _configuration = configuration;
        }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            //optionsBuilder.UseSqlServer(Configuration["ConnectionStrings:DBContext"]);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Admin
            //modelBuilder.Entity<Admin>(entity =>
            //{
            //    entity.HasIndex(e => e.Username).IsUnique();
            //});
            ////Area
            //modelBuilder.Entity<Area>(entity =>
            //{
            //    entity.Property(e => e.UpdateAt).HasDefaultValueSql("(getdate())");
            //});
            ////Guests
            //modelBuilder.Entity<Guest>(entity =>
            //{
            //    entity.HasIndex(e => e.Username).IsUnique();
            //});
            ////SystemProcessNote
            //modelBuilder.Entity<SystemProcessNote>(entity =>
            //{
            //    entity.Property(e => e.CreateAt).HasDefaultValueSql("(getdate())");
            //});
            ////ProcessCondition
            //modelBuilder.Entity<SystemProcessCondition>()
            //.HasOne(sd => sd.Sensor)
            //.WithMany()
            //.HasForeignKey(sd => sd.SensorID)
            //.OnDelete(DeleteBehavior.Restrict);

            ////ResponseGateway
            //modelBuilder.Entity<ResponseGateway>(entity =>
            //{
            //    entity.Property(e => e.CreateAt).HasDefaultValueSql("(getdate())");
            //});

            ////Sensor

            ////SensorData
            //modelBuilder.Entity<SensorData>()
            //.HasOne(sd => sd.Sensor)
            //.WithMany()
            //.HasForeignKey(sd => sd.SensorID)
            //.OnDelete(DeleteBehavior.Restrict);

            ////System
            //modelBuilder.Entity<System>(entity =>
            //{
            //    entity.Property(e => e.UpdateAt).HasDefaultValueSql("(getdate())");
            //    entity.HasIndex(e => e.Address).IsUnique();
            //});

            ////SystemProcess
            //modelBuilder.Entity<System>(entity =>
            //{
            //    entity.Property(e => e.UpdateAt).HasDefaultValueSql("(getdate())");
            //});

            ////user
            //modelBuilder.Entity<User>(entity =>
            //{
            //    //entity.Property(e => e.Role).HasDefaultValueSql(_configuration.GetValue<string>("Role:User"));
            //    //entity.Property(e => e.Password).HasDefaultValue("leanway");
            //    entity.HasIndex(e => e.Username).IsUnique();

            //});


            ////userArea
            //modelBuilder.Entity<UserArea>()
            //     .HasKey(ua => new { ua.UserID, ua.AreaID });

            //modelBuilder.Entity<UserArea>()
            //    .HasOne(ua => ua.User)
            //    .WithMany(u => u.UserAreas)
            //    .HasForeignKey(ua => ua.UserID);

            //modelBuilder.Entity<UserArea>()
            //    .HasOne(ua => ua.Area)
            //    .WithMany(a => a.UserAreas)
            //    .HasForeignKey(ua => ua.AreaID);




            ////GroupID có thể null
            //modelBuilder.Entity<User>()
            //.HasOne(t => t.Group)
            //.WithMany()
            //.HasForeignKey(t => t.GroupID)
            //.OnDelete(DeleteBehavior.SetNull);
        }
    }
}