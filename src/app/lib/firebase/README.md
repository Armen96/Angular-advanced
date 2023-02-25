# FireBase

The FireBase module configures and provides Firebase and AngularFire (the official Angular library for Firebase)

## Utilites

### Firestore Resolver

We use a routing model where nested resources (collections in Firestore) are represented as segments of the URI.

The modules load the specified resource through a route resolver, appending the loaded value to the active route data.

The FirestoreResolver handles mapping a request param to the firestore document. For example, the following path is 
handled with the team router and points to the `demo` team.

`/app/teams/demo`

The team routing module attaches a resolver to the `teams/:team` segment, loading the team and passing it to the child routes:

```typescript
const routes: Routes = [
  {
    path: '',
    component: TeamsComponent
  },
  {
    path: ':team',
    resolve: {team: TeamResolver},
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      ...
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [TeamResolver]
})
export class TeamsRoutingModule { }

```

The TeamResolver is an instance of FirestoreResolver and handles resolving the team, in this case looking for 
the `team` param, then loading that document from the `teams` collection.

```typescript
@Injectable()
export class TeamResolver extends FirestoreResolver {
  protected collection = 'teams';
  protected param = 'team';
}
```
You can then fetch the resource from the `ActivatedRoute` data:

```typescript
constructor(private route: ActivatedRoute) {}

ngOnInit() {
  this.team = this.route.snapshot.data.team;
}
    
```
